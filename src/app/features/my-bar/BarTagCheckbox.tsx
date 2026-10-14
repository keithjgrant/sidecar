import React from 'react';
import { Checkbox } from '../../components/forms';
import { formatBarLabel } from './myBarUtils';

interface BarTagCheckboxProps {
  tag: string;
  checked: boolean;
  onToggle: (tag: string, checked: boolean) => void;
}

export default function BarTagCheckbox({
  tag,
  checked,
  onToggle,
}: BarTagCheckboxProps) {
  return (
    <Checkbox
      id={`bar-${tag}`}
      checked={checked}
      onChange={(next) => {
        onToggle(tag, next);
      }}
      label={formatBarLabel(tag)}
    />
  );
}
