import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Toast from '../../components/Toast';
import Star from '../../components/svg/Star';
import { useFavorite } from '../../storage/favorites';
import { click } from '../../lib/haptic';

const Button = styled.button`
  display: inline-block;
  padding: 1rem 1.8rem 0.9rem;
  border: 0;
  background: transparent;
  color: var(--brand-primary);
  cursor: pointer;

  &:hover {
    color: var(--white);
  }

  & svg {
    height: 1.2rem;
  }
`;

interface FavoriteButtonProps {
  drinkName: string;
}

export default function FavoriteButton({ drinkName }: FavoriteButtonProps) {
  const [message, setMessage] = useState('');
  const { isFavorite, toggle } = useFavorite(drinkName);

  const onClick = async () => {
    click();
    const wasFavorite = isFavorite;
    await toggle();
    setMessage(wasFavorite ? 'Removed from' : 'Added to');
  };
  return (
    <>
      <Button onClick={onClick} type="button">
        <Star isFilled={isFavorite} />
      </Button>
      <Toast
        message={
          message && (
            <span>
              {message} <Link to="/favorites">favorites</Link>
            </span>
          )
        }
        onDone={() => setMessage('')}
      />
    </>
  );
}
