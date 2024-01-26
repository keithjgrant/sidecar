import React, { createElement } from 'react';
import Markdown from 'react-markdown';

export default function InlineMarkdown({ children }) {
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
