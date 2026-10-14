import React from 'react';
import styled from 'styled-components';
import BarTagCheckbox from './BarTagCheckbox';
import type { BarCatalogItem as BarCatalogItemType } from '../../config/barConfig';

const SpiritFamily = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  margin-bottom: 0.85rem;
`;

const NestedChildren = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-left: 0.35rem;
  padding-left: 1.1rem;
  border-left: 1px solid var(--card-border);
`;

interface BarCatalogItemProps {
  item: BarCatalogItemType;
  owned: Set<string>;
  onToggle: (tag: string, checked: boolean) => void;
}

export default function BarCatalogItem({
  item,
  owned,
  onToggle,
}: BarCatalogItemProps) {
  return (
    <SpiritFamily>
      <BarTagCheckbox
        tag={item.tag}
        checked={owned.has(item.tag)}
        onToggle={onToggle}
      />
      {item.children?.length ? (
        <NestedChildren>
          {item.children.map((child) => (
            <BarTagCheckbox
              key={child}
              tag={child}
              checked={owned.has(child)}
              onToggle={onToggle}
            />
          ))}
        </NestedChildren>
      ) : null}
    </SpiritFamily>
  );
}
