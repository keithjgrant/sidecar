import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Card from '../../components/Card';
import BarCatalogGroup from './BarCatalogGroup';
import TextButton from './TextButton';
import {
  BAR_CATALOG,
  type BarCatalogGroup as BarCatalogGroupType,
} from '../../config/barConfig';

const PageActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-bottom: 1rem;
`;

interface BarInventoryProps {
  owned: Set<string>;
  onToggle: (tag: string, checked: boolean) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onSelectGroup: (group: BarCatalogGroupType) => void;
  onClearGroup: (group: BarCatalogGroupType) => void;
}

export default function BarInventory({
  owned,
  onToggle,
  onSelectAll,
  onClearAll,
  onSelectGroup,
  onClearGroup,
}: BarInventoryProps) {
  return (
    <Card>
      <PageActions>
        <TextButton type="button" onClick={onSelectAll}>
          Select all
        </TextButton>
        <TextButton type="button" onClick={onClearAll}>
          Clear all
        </TextButton>
      </PageActions>
      {BAR_CATALOG.map((group) => (
        <BarCatalogGroup
          key={group.id}
          group={group}
          owned={owned}
          onToggle={onToggle}
          onSelectGroup={onSelectGroup}
          onClearGroup={onClearGroup}
        />
      ))}
      <p>
        Common bar staples (bitters, ice, garnishes) and recipe-specific
        homemade syrups aren’t tracked and are assumed available.
      </p>
    </Card>
  );
}
