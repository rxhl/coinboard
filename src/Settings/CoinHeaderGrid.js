import React from 'react';
import styled from 'styled-components';
import { DeletableTile } from '../Shared/Tile';

export const CoinHeaderGridStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  color: #111;
  padding: 10px 0;
`;

export const CoinSymbol = styled.div`
  justify-self: right;
  font-weight: 700;
`;

const DeleteIcon = styled.div`
  justify-self: right;
  display: none;
  font-weight: 700;
  ${DeletableTile}: hover & {
    display: block;
    color: #ff6347;
  }
`;

export default function({ name, symbol, topSection }) {
  return (
    <CoinHeaderGridStyled>
      <div>{name}</div>
      {topSection ? (
        <DeleteIcon>X</DeleteIcon>
      ) : (
        <CoinSymbol>{symbol}</CoinSymbol>
      )}
    </CoinHeaderGridStyled>
  );
}
