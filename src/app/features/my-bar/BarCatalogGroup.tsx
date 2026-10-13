import React from 'react';
import styled, { css } from 'styled-components';
import CollapsibleSection from '../../components/CollapsibleSection';
import BarGroupBody from './BarGroupBody';
import TextButton from './TextButton';
import type { BarCatalogGroup as BarCatalogGroupType } from '../../config/barConfig';
import { countOwnedInGroup, getGroupTags } from './myBarUtils';

const Group = styled.section`
  &:not(:first-child) {
    margin-top: 0.75rem;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.25rem 0.75rem;
`;

const SectionToggle = styled.button<{ $isExpanded: boolean }>`
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  flex: 1 1 auto;
  min-width: 12rem;
  margin: 0;
  padding: 0.35rem 0;
  border: 0;
  background: transparent;
  color: var(--gray-8);
  text-align: left;
  cursor: pointer;

  &:hover {
    color: var(--white);
  }
`;

const SectionTitle = styled.span<{ $isExpanded: boolean }>`
  position: relative;
  padding-right: 1.3em;
  font-size: 1.1rem;
  font-weight: var(--font-weight-bold, 600);

  &::after {
    content: '';
    position: absolute;
    top: 0.45em;
    right: 0;
    border: 0.35em solid transparent;
    border-left-color: currentColor;
    transform-origin: 0.2em center;
    transition: transform 0.2s var(--ease-out-cubic, ease);
  }

  ${(props) =>
    props.$isExpanded &&
    css`
      &::after {
        transform: rotate(90deg);
      }
    `}
`;

const SectionCount = styled.span`
  font-size: 0.9rem;
  font-weight: var(--font-weight-normal, 400);
  color: var(--gray-6, #8a8588);
`;

const SectionActions = styled.div`
  display: flex;
  gap: 0.65rem;
`;

const SectionBody = styled.div`
  padding: 0.5rem 0 0.25rem;
`;

interface BarCatalogGroupProps {
  group: BarCatalogGroupType;
  owned: Set<string>;
  onToggle: (tag: string, checked: boolean) => void;
  onSelectGroup: (group: BarCatalogGroupType) => void;
  onClearGroup: (group: BarCatalogGroupType) => void;
}

export default function BarCatalogGroup({
  group,
  owned,
  onToggle,
  onSelectGroup,
  onClearGroup,
}: BarCatalogGroupProps) {
  const selectedCount = countOwnedInGroup(group, owned);
  const totalCount = getGroupTags(group).length;

  return (
    <Group>
      <CollapsibleSection
        startExpanded={false}
        renderToggle={({ toggle, isExpanded }) => (
          <SectionHeader>
            <SectionToggle
              type="button"
              onClick={toggle}
              $isExpanded={isExpanded}
              aria-expanded={isExpanded}
            >
              <SectionTitle $isExpanded={isExpanded}>
                {group.label}
              </SectionTitle>
              {!isExpanded && (
                <SectionCount>
                  {selectedCount}/{totalCount}
                </SectionCount>
              )}
            </SectionToggle>
            <SectionActions>
              <TextButton
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectGroup(group);
                }}
              >
                Select all
              </TextButton>
              <TextButton
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onClearGroup(group);
                }}
              >
                Clear
              </TextButton>
            </SectionActions>
          </SectionHeader>
        )}
      >
        <SectionBody>
          <BarGroupBody group={group} owned={owned} onToggle={onToggle} />
        </SectionBody>
      </CollapsibleSection>
    </Group>
  );
}
