import { defineField, defineType } from "sanity";

export const mediaMention = defineType({
  name: "mediaMention",
  title: "掲載・紹介",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "記事・投稿タイトル",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publisher",
      title: "媒体名",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "掲載日",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "掲載元URL",
      type: "url",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "category",
      title: "カテゴリ",
      type: "string",
      options: {
        list: [
          { title: "メディア掲載", value: "メディア掲載" },
          { title: "店舗紹介", value: "店舗紹介" },
          { title: "外部レビュー", value: "外部レビュー" },
          { title: "開店情報", value: "開店情報" },
          { title: "SNS紹介", value: "SNS紹介" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "紹介文",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnailImage",
      title: "サムネイル画像",
      type: "image",
      options: { hotspot: true },
      description:
        "Sanityに画像をアップロードする場合はこちらを使います。外部URLより優先して表示します。",
    }),
    defineField({
      name: "thumbnailUrl",
      title: "外部サムネイルURL",
      type: "url",
      description:
        "掲載元のOG画像などを使う場合に入力します。表示できない場合は未入力にしてください。",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
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
      description: "数字が小さいほど上に表示されます。未入力の場合は掲載日の新しい順です。",
    }),
  ],
  orderings: [
    {
      title: "並び順",
      name: "sortOrderAsc",
      by: [
        { field: "sortOrder", direction: "asc" },
        { field: "publishedAt", direction: "desc" },
      ],
    },
    {
      title: "掲載日（新しい順）",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "publisher",
      media: "thumbnailImage",
    },
  },
});
