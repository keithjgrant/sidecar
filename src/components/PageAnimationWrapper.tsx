import React, { useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const inAnimation = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
`;

const backAnimation = keyframes`
  from {
    transform: none;
  }
  to {
    transform: translateX(100vw);
  }
`;

const Wrapper = styled.div`
  @media (display-mode: standalone) {
    &.in {
      animation: ${inAnimation} 0.2s ease-in;
      animation-fill-mode: forwards;
      transform-origin: center 40vh;
    }
  }

  &.out {
    animation: ${backAnimation} 0.2s var(--ease-out-cubic);
    animation-fill-mode: forwards;
  }
`;

interface AnimationContext {
  animateOut: () => Promise<void>;
}

const Context = React.createContext<AnimationContext>({
  animateOut: () => Promise.resolve(),
});

interface PageAnimationWrapperProps {
  children: React.ReactNode;
}

export default function PageAnimationWrapper({ children }: PageAnimationWrapperProps) {
  const [isOut, setIsOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Context.Provider
      value={{
        animateOut: () => {
          const promise = new Promise<void>((resolve) => {
            ref.current?.addEventListener('animationend', () => resolve());
          });
          // promise.finally(() => {
          //   ref.current.removeEventListener('animationend', resolve);
          // })
          setIsOut(true);
          return promise;
        },
      }}
    >
      <Wrapper className={isOut ? 'out' : 'in'} ref={ref}>
        {children}
      </Wrapper>
    </Context.Provider>
  );
}

export { Context };
