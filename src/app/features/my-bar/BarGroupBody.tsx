import React from 'react';
import styled from 'styled-components';
import BarCatalogItem from './BarCatalogItem';
import BarTagCheckbox from './BarTagCheckbox';
import type { BarCatalogGroup } from '../../config/barConfig';

const CheckboxGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.55rem 1rem;
  align-items: start;

  @media (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const SpiritColumns = styled.div`
  columns: 1;
  column-gap: 1rem;

  @media (min-width: 500px) {
    columns: 2;
  }

  @media (min-width: 800px) {
    columns: 3;
  }
`;

interface BarGroupBodyProps {
  group: BarCatalogGroup;
  owned: Set<string>;
  onToggle: (tag: string, checked: boolean) => void;
}

export default function BarGroupBody({
  group,
  owned,
  onToggle,
}: BarGroupBodyProps) {
  const hasNesting = group.items.some((item) => item.children?.length);
  if (hasNesting) {
    return (
      <SpiritColumns>
        {group.items.map((item) => (
          <BarCatalogItem
            key={item.tag}
            item={item}
            owned={owned}
            onToggle={onToggle}
          />
        ))}
      </SpiritColumns>
    );
  }
  return (
    <CheckboxGrid>
      {group.items.map((item) => (
        <BarTagCheckbox
          key={item.tag}
          tag={item.tag}
          checked={owned.has(item.tag)}
          onToggle={onToggle}
        />
      ))}
    </CheckboxGrid>
  );
}
