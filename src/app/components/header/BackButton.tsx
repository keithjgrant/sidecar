import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import CaretLeft from '../svg/CaretLeft';
import { long } from '../../lib/haptic';

interface BackButtonProps {
  alt?: string;
}

export default function BackButton({ alt }: BackButtonProps) {
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const initialPage = window.location.href;
    window.history.back();
    setTimeout(() => {
      if (window.location.href === initialPage) {
        window.location.href = '/';
      }
    }, 500);
  };

  const onTouchStart = () => {
    timeout.current = setTimeout(() => {
      long();
      setTimeout(() => {
        window.location.href = '/';
      }, 150);
    }, 1000);
  };

  const onTouchEnd = () => {
    if (timeout.current) clearTimeout(timeout.current);
  };

  return (
    <button
      className="back-button"
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <CaretLeft title={alt} />
    </button>
  );
}
