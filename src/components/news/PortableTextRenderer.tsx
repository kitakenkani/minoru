"use client";

import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImage } from "@/types";

const components = {
  types: {
    image: ({ value }: { value: SanityImage & { alt?: string } }) => (
      <div className="my-6 overflow-hidden rounded">
        <Image
          src={urlFor(value).width(800).url()}
          alt={value.alt ?? ""}
          width={800}
          height={500}
          unoptimized
          className="w-full object-cover"
        />
      </div>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mb-4 mt-10 text-xl font-medium text-stone-800">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mb-3 mt-8 text-lg font-medium text-stone-800">
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-stone-700">{children}</p>
    ),
  },
  marks: {
    link: ({
      value,
      children,
    }: {
      value?: { href: string };
      children?: React.ReactNode;
    }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-2 hover:text-stone-600"
      >
        {children}
      </a>
    ),
  },
};

interface PortableTextRendererProps {
  value: PortableTextBlock[];
}

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  return (
    <div className="prose-stone max-w-none">
      <PortableText value={value} components={components} />
    </div>
  );
}
