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
