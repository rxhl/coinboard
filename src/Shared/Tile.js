import styled from 'styled-components';
import {
  subtleBoxShadow,
  lightBlueBackground,
  blueBoxShadow,
  redBoxShadow
} from '../Shared/Styles';

export const Tile = styled.div`
  ${subtleBoxShadow}
  ${lightBlueBackground}
  padding: 10px;
  color: #111;
  display: grid;
  grid-gap: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export const SelectableTile = styled(Tile)`
  &:hover {
    cursor: pointer;
    ${blueBoxShadow}
  }
`;

export const DeletableTile = styled(SelectableTile)`
  &:hover {
    cursor: pointer;
    ${redBoxShadow}
  }
`;

export const DisabledTile = styled(Tile)`
  pointer-events: none;
  opacity: 0.4;
`;
