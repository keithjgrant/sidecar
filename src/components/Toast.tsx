import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fallIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: none;
  }
`;

const ToastMessage = styled.div`
  display: none;
  position: fixed;
  top: 3rem;
  right: 0;
  left: 0;
  padding: 0.3em 0.5em;
  border: 1px solid var(--brand-primary);
  background: var(--gray-dark);
  color: var(--white);
  font-size: 0.8rem;
  text-align: center;
  text-transform: uppercase;
  box-shadow: 0.1em 0.3em 0.7em var(--black);

  &.in {
    display: block;
    animation: ${fallIn} 0.2s var(--ease-out-cubic);
  }

  &.fade {
    transition: opacity 0.2s linear;
    opacity: 0;
  }
`;

const OUT = 'out';
const IN = 'in';
const FADE = 'in fade';
const DURATION = 3000;

interface ToastProps {
  message: React.ReactNode;
  onDone: () => void;
}

export default function Toast({ message, onDone }: ToastProps) {
  const [isIn, setIsIn] = useState(OUT);
  const inTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    if (inTimeout.current) clearTimeout(inTimeout.current);
    if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    setIsIn(IN);
    inTimeout.current = setTimeout(fadeOut, DURATION);
  }

  function fadeOut() {
    setIsIn(FADE);
    fadeTimeout.current = setTimeout(hide, 200);
  }

  function hide() {
    setIsIn(OUT);
    onDone();
  }

  useEffect(() => {
    if (!message) {
      return;
    }
    show();
    return () => {
      if (inTimeout.current) clearTimeout(inTimeout.current);
      if (fadeTimeout.current) clearTimeout(fadeTimeout.current);
    };
  }, [message]);

  return <ToastMessage className={isIn}>{message}</ToastMessage>;
}
