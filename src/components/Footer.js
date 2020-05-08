import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.footer`
  padding: 1rem;
  border-top: 1px solid var(--gray-4);
  color: var(--gray-6);
  font-size: 0.8rem;
`;

const Split = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

export default function Footer() {
  return (
    <Wrapper>
      <Split>
        <div>
          © {new Date().getFullYear()}{' '}
          <a href="https://keithjgrant.com">Keith J. Grant</a>. All rights
          reserved.
        </div>
        <div css="text-align: right">Don’t you dare drink and drive.</div>
      </Split>
    </Wrapper>
  );
}