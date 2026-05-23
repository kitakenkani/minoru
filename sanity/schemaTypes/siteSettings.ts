import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "サイト設定",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "サイト名",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "サイト説明",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroCatch",
      title: "トップキャッチコピー",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "住所",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "businessHours",
      title: "営業時間",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "holiday",
      title: "定休日",
      type: "string",
    }),
    defineField({
      name: "parking",
      title: "駐車場案内",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "parkingGuideImage",
      title: "駐車場案内画像",
      type: "image",
      options: { hotspot: true },
      description: "アクセスページの駐車場案内図として表示します。",
    }),
    defineField({
      name: "parkingGuideImageAlt",
      title: "駐車場案内画像の代替テキスト",
      type: "string",
      description: "未入力の場合は標準の説明文を使用します。",
    }),
    defineField({
      name: "googleMapUrl",
      title: "Google Map 埋め込み URL",
      type: "url",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "email",
      title: "メールアドレス",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "mainVisual",
      title: "メインビジュアル",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "contactText",
      title: "連絡案内",
      type: "string",
    }),
  ],
});
