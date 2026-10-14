import React from 'react';
import Markdown from 'react-markdown';

interface InlineMarkdownProps {
  children: string;
}

export default function InlineMarkdown({ children }: InlineMarkdownProps) {
  return (
    <Markdown
      components={{
        p: ({ node, ...props }) => <span {...props} />,
      }}
    >
      {children}
    </Markdown>
  );
}
