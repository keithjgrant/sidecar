import React, { useState, useRef, useEffect } from 'react';
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

type AnimationPhase = 'in' | 'idle' | 'out';

interface PageAnimationWrapperProps {
  children: React.ReactNode;
}

export default function PageAnimationWrapper({
  children,
}: PageAnimationWrapperProps) {
  const [phase, setPhase] = useState<AnimationPhase>('in');
  const ref = useRef<HTMLDivElement>(null);

  // Drop `.in` after the enter animation so no transform remains on the
  // wrapper — otherwise position:fixed descendants bind to this element
  // instead of the viewport (PWA standalone). Outside standalone the
  // enter animation does not run, so clear immediately.
  useEffect(() => {
    if (phase !== 'in') {
      return undefined;
    }
    const el = ref.current;
    if (!el) {
      return undefined;
    }

    const isStandalone = window.matchMedia(
      '(display-mode: standalone)'
    ).matches;
    if (!isStandalone) {
      setPhase('idle');
      return undefined;
    }

    const onEnd = (event: AnimationEvent) => {
      if (event.target !== el) {
        return;
      }
      setPhase('idle');
    };

    el.addEventListener('animationend', onEnd);
    return () => {
      el.removeEventListener('animationend', onEnd);
    };
  }, [phase]);

  const className = phase === 'in' ? 'in' : phase === 'out' ? 'out' : undefined;

  return (
    <Context.Provider
      value={{
        animateOut: () => {
          const promise = new Promise<void>((resolve) => {
            const el = ref.current;
            if (!el) {
              resolve();
              return;
            }
            const onEnd = (event: AnimationEvent) => {
              if (event.target !== el) {
                return;
              }
              el.removeEventListener('animationend', onEnd);
              resolve();
            };
            el.addEventListener('animationend', onEnd);
          });
          setPhase('out');
          return promise;
        },
      }}
    >
      <Wrapper className={className} ref={ref}>
        {children}
      </Wrapper>
    </Context.Provider>
  );
}

export { Context };
