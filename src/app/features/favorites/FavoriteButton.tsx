import React, { useState } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Toast from '../../components/Toast';
import Star from '../../components/svg/Star';
import { useFavorite } from '../../storage/favorites';
import { click } from '../../lib/haptic';

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
      <button className="favorite-button" onClick={onClick} type="button">
        <Star isFilled={isFavorite} />
      </button>
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
