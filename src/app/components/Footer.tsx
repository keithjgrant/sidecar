import React from 'react';

const year = new Date().getFullYear();

interface FooterProps {
  content?: React.ReactNode;
  className?: string;
}

export default function Footer({ content, className }: FooterProps) {
  return (
    <footer className="page-footer prose">
      <p>
        © 2018–{year} <a href="https://keithjgrant.com">Keith J. Grant</a>.
        All&nbsp;rights&nbsp;reserved.
      </p>
      <p style={{ textAlign: 'right' }}>
        {content || 'Please drink responsibly.'}
      </p>
    </footer>
  );
}
