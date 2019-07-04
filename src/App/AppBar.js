import React from 'react';
import styled, { css } from 'styled-components';
import { AppContext } from './AppProvider';

const Logo = styled.div`
  font-size: 1.5em;
  font-weight: 700;
  color: #01579b;
`;

const Bar = styled.div`
  display: grid;
  text-transform: capitalize;
  padding: 20px 0;
  grid-template-columns: 100px auto 100px 100px;
`;

const ControlButtonElem = styled.div`
  cursor: pointer;
  ${props =>
    props.active &&
    css`
      color: #01579b;
    `}
  ${props =>
    props.hidden &&
    css`
      display: none;
    `}
`;

function ControlButton({ name, active }) {
  // Returns the styled component designed above
  return (
    <AppContext.Consumer>
      {({ firstVisit, page, setPage }) => (
        <ControlButtonElem
          hidden={firstVisit && name === 'dashboard'}
          active={page === name}
          onClick={() => setPage(name)}
        >
          {name}
        </ControlButtonElem>
      )}
    </AppContext.Consumer>
  );
}

export default function() {
  return (
    <Bar>
      <Logo>Coinboard</Logo>
      <div />
      <ControlButton name="dashboard" />
      <ControlButton name="settings" />
    </Bar>
  );
}
