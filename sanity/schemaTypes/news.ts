import { defineField, defineType } from "sanity";

export const news = defineType({
  name: "news",
  title: "お知らせ",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "タイトル",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "スラッグ",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "公開日時",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "カテゴリ",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "一覧用要約",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "mainImage",
      title: "アイキャッチ画像",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "body",
      title: "本文",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEOタイトル",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO説明",
      type: "text",
      rows: 3,
      group: "seo",
    }),
    defineField({
      name: "isFeatured",
      title: "トップ表示優先",
      type: "boolean",
      initialValue: false,
    }),
  ],
  groups: [
    { name: "seo", title: "SEO" },
  ],
  orderings: [
    {
      title: "公開日（新しい順）",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});
