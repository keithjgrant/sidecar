import React, { useState, useRef, useEffect } from 'react';

const OUT = 'out';
const IN = 'in';
const FADE = 'in fade';
const DURATION = 3000;
const FADE_DURATION = 500;

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
    fadeTimeout.current = setTimeout(hide, FADE_DURATION);
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

  return <div className={`toast-message ${isIn}`}>{message}</div>;
}
