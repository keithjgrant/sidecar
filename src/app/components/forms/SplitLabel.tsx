import React from 'react';
import styled from 'styled-components';

const Heading = styled.strong`
  display: block;
  font-weight: 400;
`;

interface SplitLabelProps {
  heading?: string;
  className?: string;
  children: React.ReactNode;
}

export default function SplitLabel({ heading, className, children }: SplitLabelProps) {
  return (
    <div className={className}>
      {heading ? <Heading>{heading}</Heading> : null}
      {children}
    </div>
  );
}
