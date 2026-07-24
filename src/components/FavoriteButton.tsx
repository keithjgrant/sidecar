import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Toast from './Toast';
import Star from './svg/Star';
import db from '../util/db';
import { click } from '../util/haptic';

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
  const [checked, setChecked] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      const favorite = await db.getFavorite(drinkName);
      if (favorite) {
        setChecked(true);
      }
    })();
  }, []);

  const onClick = async () => {
    click();
    setChecked(!checked);
    if (checked) {
      db.deleteFavorite(drinkName);
      setMessage('Removed from');
    } else {
      db.addFavorite(drinkName);
      setMessage('Added to');
    }
  };
  return (
    <>
      <Button onClick={onClick} type="button">
        <Star isFilled={checked} />
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
