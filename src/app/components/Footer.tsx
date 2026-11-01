import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
  margin-block-start: var(--SIZE-XL);
  padding: 1rem;
  color: var(--text-subtle);
  font-size: 0.8rem;
  background-color: var(--bg-card--secondary);
  background-image: linear-gradient(
    to bottom,
    var(--bg-card),
    var(--bg-card--secondary)
  );

  a {
    color: inherit;
  }
`;

const Split = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const year = new Date().getFullYear();

interface FooterProps {
  content?: React.ReactNode;
  className?: string;
}

export default function Footer({ content, className }: FooterProps) {
  return (
    <Wrapper className={className}>
      <Split>
        <div>
          © 2018–{year} <a href="https://keithjgrant.com">Keith J. Grant</a>.
          All&nbsp;rights&nbsp;reserved.
        </div>
        <div style={{ textAlign: 'right' }}>
          {content || 'Please drink responsibly.'}
        </div>
      </Split>
    </Wrapper>
  );
}
