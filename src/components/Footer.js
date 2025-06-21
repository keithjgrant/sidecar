import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
  padding: 1rem;
  border-top: 1px solid var(--gray-4);
  color: var(--gray-6);
  font-size: 0.8rem;

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

export default function Footer({ content, className }) {
  return (
    <Wrapper className={className}>
      <Split>
        <div>
          © 2018–{year} <a href="https://keithjgrant.com">Keith J. Grant</a>.
          All rights reserved.
        </div>
        <div css="text-align: right">
          {content || 'Please drink responsibly.'}
        </div>
      </Split>
    </Wrapper>
  );
}
