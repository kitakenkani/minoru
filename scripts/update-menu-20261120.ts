import { getCliClient } from "sanity/cli";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";

// Run with sanity exec --with-user-token. Dry run by default; --apply commits.
// CSV is read-only. Only the explicitly reviewed product IDs below are published.
async function main() {
  const path = process.argv.find((arg) => arg.endsWith(".csv"));
  assert(path, "Pass the reviewed AirREGI CSV path");
  const text = new TextDecoder("shift_jis").decode(await readFile(path));
  const records: string[][] = [];
  let row: string[] = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '"') {
      if (quoted && text[i + 1] === '"') { cell += '"'; i++; }
      else quoted = !quoted;
    } else if (c === "," && !quoted) { row.push(cell); cell = ""; }
    else if ((c === "\n" || c === "\r") && !quoted) {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); records.push(row); row = []; cell = "";
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); records.push(row); }
  assert(!quoted, "Unclosed CSV quote");
  assert.equal(records[1][0], "商品ID");
  assert(records[1][14].includes("価格"));
  assert(records[1][21].includes("表示/非表示"));
  const rows = records.slice(2).filter((r) => r.length === 27);
  assert.equal(rows.length, 179, "Unexpected input snapshot");
  function product(id: string) {
    const matches = rows.filter((r) => r[0] === id);
    assert(matches.length, `Missing product ${id}`);
    assert(matches.every((r) => r[21] === "表示" && r[9] === "内税"), `Not active/tax-inclusive: ${id}`);
    const prices = [...new Set(matches.map((r) => Number(r[14])))];
    assert.equal(prices.length, 1, `Variant price differs: ${id}`);
    assert(Number.isFinite(prices[0]));
    return { name: matches[0][4], price: prices[0] };
  }
  const client = getCliClient({ apiVersion: "2024-01-01" }).withConfig({ useCdn: false });
  assert.equal(client.config().projectId, "lk8pdmmq");
  assert.equal(client.config().dataset, "production");
  const existing = await client.fetch('*[_type == "menuItem" && !(_id in path("drafts.**"))]');
  const patches: { id: string; revision: string; values: Record<string, unknown> }[] = [];
  const creates: Record<string, unknown>[] = [];
  function patch(name: string, values: Record<string, unknown>) {
    const matches = existing.filter((doc: { name: string }) => doc.name === name);
    assert.equal(matches.length, 1, `Ambiguous/missing CMS item: ${name}`);
    patches.push({ id: matches[0]._id, revision: matches[0]._rev, values });
  }
  const updates = [
    ["サーモン＆アボカドワッフル", "10006", "10041", "food"],
    ["ベーコンエッグワッフル", "10007", "10042", "food"],
    ["抹茶ワッフル", "10004", "10045", "waffle"],
    ["シナモンシュガーワッフル", "10005", "10044", "waffle"],
    ["チョコバナナワッフル", "10003", "10046", "waffle"],
  ];
  for (const [name, id, setId, category] of updates) {
    patch(name, { price: product(id).price, setPrice: product(setId).price, category,
      ...(category === "food" ? { priceNote: "セットはスープ付きです。" } : {}) });
  }
  for (const [id, name] of [
    ["10101", "朝摘み！ひんやり納涼セット"],
    ["10099", "朝摘みベリーとクリームチーズの甘酸っぱいワッフル"],
    ["10100", "朝摘みベリーのひんやりソイスムージー"],
    ["10087", "季節の自家製ジャムワッフル(ミックスベリー)"],
    ["10017", "ハーブティ"],
  ]) {
    assert(rows.filter((r) => r[0] === id).every((r) => r[21] === "非表示"));
    patch(name, { isPublished: false });
  }
  patch("ウーロン茶", { name: "ウーロン茶（ホット／アイス）" });
  function add(id: string, category: string, options: { name?: string; setId?: string; priceNote?: string; sortOrder?: number } = {}) {
    const source = product(id);
    const doc = { _id: `airregi-${id}`, _type: "menuItem", name: options.name ?? source.name,
      price: source.price, category, isPublished: true, isSeasonal: category === "seasonal",
      sortOrder: options.sortOrder ?? creates.length + 10,
      ...(options.setId ? { setPrice: product(options.setId).price } : {}),
      ...(options.priceNote ? { priceNote: options.priceNote } : {}) };
    assert(!existing.some((item: { _id: string; name: string; category: string }) => item._id === doc._id || (item.name === doc.name && item.category === category)), `Already exists: ${doc.name}`);
    creates.push(doc);
  }
  add("10132", "morning", { name: "モーニングプレート", setId: "10133", priceNote:
    `ワッフル追加 ＋${product("10135").price}円\nトッピング追加 各＋${product("10136").price}円（ベーコン・目玉焼き・ポーチドエッグ・アボカド・バナナキャラメリゼ・あんバター）` });
  add("10116", "seasonal", { name: "季節の自家製ジャムワッフル（柿ジャム）", setId: "10117" });
  add("10114", "seasonal", { setId: "10115" });
  add("10118", "food", { setId: "10119" });
  add("10121", "drink", { name: "ココア（ホット／アイス）" });
  add("10122", "drink", { name: "レモネード（ホット／アイス）" });
  add("10123", "drink");
  add("10033", "dessert", { priceNote: `ワッフルへの追加トッピングは＋${product("10028").price}円です。` });
  add("10127", "dessert");
  add("10029", "dessert", { name: "追加トッピング：チョコソース" });
  const takeoutIds = ["10090", "10091", "10050", "10051", "10053", "10054", "10055", "10128",
    "10056", "10078", "10061", "10079", "10062", "10063", "10064", "10065", "10066", "10060", "10067",
    "10137", "10138", "10139", "10140", "10141"];
  for (const id of takeoutIds) add(id, "takeout", { name: product(id).name.replace("【テイクアウト】", "").replaceAll("　", " "),
    ...(id === "10128" ? { priceNote: "ジャムの種類は店頭でご案内します。" } : {}) });
  const drafts = await client.fetch('*[_id in $ids]{_id}', { ids: [...patches.map((p) => `drafts.${p.id}`), ...creates.map((d) => `drafts.${d._id}`)] });
  assert.equal(drafts.length, 0, "Related drafts exist; reconcile before publishing");
  console.log(JSON.stringify({ mode: process.argv.includes("--apply") ? "apply" : "dry-run", updates: patches, additions: creates }, null, 2));
  if (!process.argv.includes("--apply")) return;
  const backupDir = "output/menu-update-20261120";
  await mkdir(backupDir, { recursive: true });
  await writeFile(`${backupDir}/sanity-before.json`, JSON.stringify(existing, null, 2), { flag: "wx" });
  let transaction = client.transaction();
  for (const { id, revision, values } of patches) transaction = transaction.patch(id, (p) => p.ifRevisionId(revision).set(values));
  for (const doc of creates) transaction = transaction.create(doc as { _type: string });
  const result = await transaction.commit();
  const after = await client.fetch('*[_id in $ids]', { ids: [...patches.map((p) => p.id), ...creates.map((d) => d._id)] });
  for (const { id, values } of patches) {
    const actual = after.find((d: { _id: string }) => d._id === id);
    for (const [key, value] of Object.entries(values)) assert.deepEqual(actual[key], value);
  }
  for (const doc of creates) {
    const actual = after.find((d: { _id: string }) => d._id === doc._id);
    for (const [key, value] of Object.entries(doc)) assert.deepEqual(actual[key], value);
  }
  console.log(`Verified transaction ${result.transactionId}: ${patches.length} updates, ${creates.length} additions`);
}
main().catch((error) => { console.error(error.message); process.exitCode = 1; });
