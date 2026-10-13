import React, { useState } from 'react';
import styled from 'styled-components';
import Card from '../../components/Card';
import CollapseToggle from '../../components/CollapseToggle';
import CollapsibleSection from '../../components/CollapsibleSection';
import { ButtonGroup, Checkbox } from '../../components/forms';
import Info from '../../components/svg/Info';
import type { SubstitutionMode } from '../../config/barSubstitutions';
import type { BarSettings } from '../../storage/settings';

const SUBSTITUTION_HELP: Record<SubstitutionMode, string> = {
  none: 'Only list drinks when you have the exact ingredients.',
  common: 'Allow usual bar swaps, like bourbon for rye or brandy for cognac.',
  forgiving:
    'Allow looser swaps, like Campari for Aperol or bourbon for Irish whiskey.',
};

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

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35em;
`;

const SettingsLabel = styled.span`
  font-size: 0.95rem;
  font-weight: var(--font-weight-bold, 600);
  color: var(--gray-8);
`;

const InfoButton = styled.button`
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--gray-6);
  cursor: pointer;

  svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.1em;
  }

  &:hover {
    color: var(--white);
  }
`;

const SettingsHelp = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: var(--gray-6);
`;

const CheckboxStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

interface InfoToggleProps {
  label: string;
  helpId: string;
  children: React.ReactNode;
}

function InfoToggle({ label, helpId, children }: InfoToggleProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <LabelRow>
        <SettingsLabel>{label}</SettingsLabel>
        <InfoButton
          type="button"
          aria-expanded={open}
          aria-controls={helpId}
          aria-label={`About ${label}`}
          onClick={() => {
            setOpen((value) => !value);
          }}
        >
          <Info />
        </InfoButton>
      </LabelRow>
      {open ? <SettingsHelp id={helpId}>{children}</SettingsHelp> : null}
    </>
  );
}

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
            <SettingsField>
              <InfoToggle label="Filtering" helpId="bar-filtering-help">
                Drinks filtering starts after you customize your bar below.
              </InfoToggle>
              <CheckboxStack>
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
              </CheckboxStack>
            </SettingsField>
            <SettingsField>
              <SettingsLabel>Substitutions</SettingsLabel>
              <ButtonGroup
                value={settings.substitutions}
                options={[
                  ['none', 'None'],
                  ['common', 'Common'],
                  ['forgiving', 'Forgiving'],
                ]}
                onChange={(value) => {
                  onChange({
                    substitutions: value as SubstitutionMode,
                  });
                }}
              />
              <SettingsHelp>
                {SUBSTITUTION_HELP[settings.substitutions]}
              </SettingsHelp>
            </SettingsField>
          </SettingsBody>
        </Card>
      </CollapsibleSection>
    </SettingsBlock>
  );
}
