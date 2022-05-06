import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import Card from './Card';
import { GridForm, GridFormLabel, ButtonGroup } from './forms';
import CollapsibleSection from './CollapsibleSection';
import DrinkList from './DrinkList';
import { getParams, setParam } from '../util/qs';

const Toggle = styled.button`
  position: relative;
  margin-left: 0.6rem;
  padding-right: 1.8em;

  &::after {
    content: '';
    position: absolute;
    top: 0.8em;
    right: 0.6em;
    border: 0.4em solid transparent;
    border-top-color: currentColor;
    transform-origin: center 0.2em;
  }

  ${(props) =>
    props.isExpanded &&
    css`
      color: var(--gray-8);
      &::after {
        transform: rotate(180deg);
      }
    `}
`;

const Controls = styled.div`
  display: flex;

  & > *:not(:first-child) {
    margin-left: 0.6em;
  }
`;

export default function Explore({ drinks, imageMap }) {
  const params = getParams();

  const [base, setBase] = useState('all');
  const [family, setFamily] = useState('all');
  const filtersSet = !!(params.base || params.family);

  useEffect(() => {
    if (params.base && params.base !== 'all') {
      setBase(params.base);
    }
    if (params.family && params.family !== 'all') {
      setFamily(params.family);
    }
  }, []);

  const filtered = drinks.filter(byBase(base)).filter(byFamily(family));
  return (
    <>
      <CollapsibleSection
        startExpanded={filtersSet}
        renderToggle={({ toggle, isExpanded }) => (
          <Controls>
            <Toggle onClick={toggle} isExpanded={isExpanded} className="button">
              Filter
            </Toggle>
            <Link to="/tags" className="button">
              Browse tags
            </Link>
            <Link className="button" to="/help-me-decide">
              Help me decide
            </Link>
          </Controls>
        )}
      >
        <Card>
          <GridForm>
            <GridFormLabel>Base Spirit</GridFormLabel>
            <ButtonGroup
              name="base"
              value={base}
              options={[
                'all',
                'brandy',
                'gin',
                'mezcal',
                'rum',
                'tequila',
                'vodka',
                'whiskey',
              ]}
              onChange={(value) => {
                setBase(value);
                setParam('base', value);
              }}
            />
            <GridFormLabel>Drink family</GridFormLabel>
            <ButtonGroup
              name="family"
              value={family}
              options={[
                'all',
                'sour',
                'sidecar',
                'old fashioned',
                'martini',
                'highball',
                'flip',
              ]}
              onChange={(value) => {
                setFamily(value);
                setParam('family', value);
              }}
            />
          </GridForm>
        </Card>
      </CollapsibleSection>
      <DrinkList drinks={filtered} imageMap={imageMap} />
    </>
  );
}

function byBase(base) {
  return (drink) => base === 'all' || drink.tags.includes(base);
}

function byFamily(family) {
  return (drink) => family === 'all' || drink.family === family;
}
