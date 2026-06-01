import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const prose =
  "text-[1.05rem] leading-[1.8] text-tfa-muted [&_em]:text-tfa-ink [&_em]:not-italic [&_strong]:font-semibold [&_strong]:text-tfa-ink";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className={`${prose} [&:not(:first-child)]:mt-5`}>{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 font-serif text-2xl font-semibold text-tfa-ink">
        {children}
      </h2>
    ),
  },
  marks: {
    em: ({ children }) => (
      <em className="font-serif text-lg italic text-tfa-ink">{children}</em>
    ),
    strong: ({ children }) => <strong>{children}</strong>,
  },
};

export function RichTextBody({
  value,
  className = "",
}: {
  value: PortableTextBlock[];
  className?: string;
}) {
  return (
    <div className={className}>
      <PortableText value={value} components={components} />
    </div>
  );
}

export function RichTextInline({
  value,
  className = "",
}: {
  value: PortableTextBlock[];
  className?: string;
}) {
  return (
    <div className={`${prose} ${className}`}>
      <PortableText
        value={value}
        components={{
          ...components,
          block: {
            normal: ({ children }) => <span>{children}</span>,
          },
        }}
      />
    </div>
  );
}
