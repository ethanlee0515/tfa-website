import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const prose =
  "text-lg leading-[1.75] text-tfa-ink [&_em]:italic [&_strong]:font-semibold [&_a]:underline [&_a]:decoration-tfa-red/50 [&_a]:underline-offset-4 [&_a:hover]:text-tfa-red";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className={`${prose} [&:not(:first-child)]:mt-5`}>{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 mb-3 font-serif text-2xl leading-tight font-semibold tracking-[-0.015em] text-tfa-ink">
        {children}
      </h2>
    ),
  },
  marks: {
    em: ({ children }) => <em className="italic">{children}</em>,
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
