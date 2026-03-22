import { defineField, defineType } from "sanity";

export const menuItem = defineType({
  name: "menuItem",
  title: "メニュー",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "商品名",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "スラッグ",
      type: "slug",
      options: { source: "name" },
    }),
    defineField({
      name: "category",
      title: "カテゴリ",
      type: "string",
      options: {
        list: [
          { title: "ワッフル", value: "waffle" },
          { title: "ドリンク", value: "drink" },
          { title: "フード", value: "food" },
          { title: "デザート", value: "dessert" },
          { title: "その他", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "商品説明",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "price",
      title: "価格（円）",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "商品画像",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "isSeasonal",
      title: "季節メニュー",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "isPublished",
      title: "公開する",
      type: "boolean",
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "並び順",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "並び順",
      name: "sortOrderAsc",
      by: [{ field: "sortOrder", direction: "asc" }],
    },
  ],
});
