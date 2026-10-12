import React from 'react';
import styled from 'styled-components';
import Card from '../../components/Card';
import CollapseToggle from '../../components/CollapseToggle';
import CollapsibleSection from '../../components/CollapsibleSection';
import { ButtonGroup, Checkbox } from '../../components/forms';
import type { SubstitutionMode } from '../../config/barSubstitutions';
import type { BarSettings } from '../../storage/settings';

const SettingsBlock = styled.div`
  margin-bottom: 1rem;
`;

const SettingsBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SettingsField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const SettingsLabel = styled.span`
  font-size: 0.95rem;
  font-weight: var(--font-weight-bold, 600);
  color: var(--gray-8);
`;

const SettingsHelp = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--gray-6, #8a8588);
`;

interface BarSettingsPanelProps {
  settings: BarSettings;
  onChange: (partial: Partial<BarSettings>) => void;
}

export default function BarSettingsPanel({
  settings,
  onChange,
}: BarSettingsPanelProps) {
  return (
    <SettingsBlock>
      <CollapsibleSection
        startExpanded={false}
        renderToggle={({ toggle, isExpanded }) => (
          <CollapseToggle isExpanded={isExpanded} onClick={toggle}>
            Settings
          </CollapseToggle>
        )}
      >
        <Card>
          <SettingsBody>
            <Checkbox
              id="bar-filter-drinks"
              checked={settings.filterDrinksByBar}
              onChange={(checked) => {
                onChange({ filterDrinksByBar: checked });
              }}
              label="Filter Drinks to what I can make"
            />
            <Checkbox
              id="bar-filter-favorites"
              checked={settings.filterFavoritesByBar}
              onChange={(checked) => {
                onChange({ filterFavoritesByBar: checked });
              }}
              label="Filter Favorites to what I can make"
            />
            <SettingsHelp>
              Drinks filtering starts after you customize your bar below.
            </SettingsHelp>
            <SettingsField>
              <SettingsLabel>Substitutions</SettingsLabel>
              <ButtonGroup
                value={settings.substitutions}
                options={[
                  ['none', 'None'],
                  ['common', 'Common'],
                  ['loose', 'Loose'],
                ]}
                onChange={(value) => {
                  onChange({
                    substitutions: value as SubstitutionMode,
                  });
                }}
              />
              <SettingsHelp>
                How freely bottles can stand in for each other when deciding if
                you can make a drink.
              </SettingsHelp>
            </SettingsField>
          </SettingsBody>
        </Card>
      </CollapsibleSection>
    </SettingsBlock>
  );
}
