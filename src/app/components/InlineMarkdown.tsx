import React from 'react';
import Markdown from 'react-markdown';

interface InlineMarkdownProps {
  children: string;
  suppressLinks?: boolean;
}

export default function InlineMarkdown({
  children,
  suppressLinks = false,
}: InlineMarkdownProps) {
  return (
    <Markdown
      components={{
        p: ({ node, ...props }) => <span {...props} />,
        a: ({ node, ...props }) =>
          suppressLinks ? <span {...props} /> : <a {...props} />,
      }}
    >
      {children}
    </Markdown>
  );
}
