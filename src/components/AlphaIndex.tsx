import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { sectionIdForLetter } from '../util/alphaGroup';

const Rail = styled.nav`
  position: fixed;
  top: 50%;
  right: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: translateY(-50%);
  padding: 0.25rem 0.15rem;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
`;

const LetterButton = styled.button`
  display: block;
  margin: 0;
  padding: 0.05em 0.35em;
  border: 0;
  background: transparent;
  color: var(--brand-primary);
  font-size: 0.65rem;
  font-weight: 600;
  line-height: 1.15;
  cursor: pointer;

  &:hover,
  &:focus {
    color: var(--white);
    outline: 0;
  }

  &[data-active='true'] {
    color: var(--white);
  }
`;

const Hud = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 21;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 4.5rem;
  transform: translate(-50%, -50%);
  border-radius: var(--border-radius);
  background: hsla(315, 5%, 12%, 0.85);
  color: var(--white);
  font-size: 2.4rem;
  font-weight: 600;
  pointer-events: none;
`;

export const LetterHeading = styled.h2`
  position: sticky;
  top: 0;
  z-index: 2;
  margin: 0 0 0.4em;
  padding: 0.35em 0.25em;
  background: var(--gray-dark);
  color: var(--gray-8);
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.04em;
`;

function scrollToLetter(prefix: string, letter: string): void {
  const el = document.getElementById(sectionIdForLetter(prefix, letter));
  if (el) {
    el.scrollIntoView({ behavior: 'auto', block: 'start' });
  }
}

interface AlphaIndexProps {
  letters: string[];
  /** Prefix for section element ids (e.g. alpha-drink). */
  idPrefix: string;
}

export default function AlphaIndex({ letters, idPrefix }: AlphaIndexProps) {
  const railRef = useRef<HTMLElement>(null);
  const lettersRef = useRef(letters);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const [isScrubbing, setIsScrubbing] = useState(false);

  lettersRef.current = letters;

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return undefined;
    }

    const letterFromClientY = (clientY: number): string | null => {
      const current = lettersRef.current;
      if (!current.length) {
        return null;
      }
      const rect = rail.getBoundingClientRect();
      if (rect.height <= 0) {
        return null;
      }
      const y = Math.min(Math.max(clientY - rect.top, 0), rect.height - 0.001);
      const index = Math.floor((y / rect.height) * current.length);
      return current[Math.min(index, current.length - 1)] ?? null;
    };

    const scrubTo = (clientY: number) => {
      const letter = letterFromClientY(clientY);
      if (!letter) {
        return;
      }
      setActiveLetter(letter);
      scrollToLetter(idPrefix, letter);
    };

    const onTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      setIsScrubbing(true);
      scrubTo(event.touches[0].clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault();
      scrubTo(event.touches[0].clientY);
    };

    const onTouchEnd = () => {
      setIsScrubbing(false);
      setActiveLetter(null);
    };

    rail.addEventListener('touchstart', onTouchStart, { passive: false });
    rail.addEventListener('touchmove', onTouchMove, { passive: false });
    rail.addEventListener('touchend', onTouchEnd);
    rail.addEventListener('touchcancel', onTouchEnd);

    return () => {
      rail.removeEventListener('touchstart', onTouchStart);
      rail.removeEventListener('touchmove', onTouchMove);
      rail.removeEventListener('touchend', onTouchEnd);
      rail.removeEventListener('touchcancel', onTouchEnd);
    };
  }, [idPrefix]);

  if (letters.length < 2) {
    return null;
  }

  return (
    <>
      <Rail ref={railRef} aria-label="Jump to letter">
        {letters.map((letter) => (
          <LetterButton
            key={letter}
            type="button"
            data-active={activeLetter === letter ? 'true' : 'false'}
            aria-label={`Jump to ${letter === '#' ? 'numbers' : letter}`}
            onClick={() => {
              setActiveLetter(letter);
              scrollToLetter(idPrefix, letter);
            }}
          >
            {letter}
          </LetterButton>
        ))}
      </Rail>
      {isScrubbing && activeLetter ? <Hud aria-hidden>{activeLetter}</Hud> : null}
    </>
  );
}
