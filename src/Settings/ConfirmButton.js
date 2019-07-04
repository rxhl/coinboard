import React from 'react';
import styled from 'styled-components';
import { AppContext } from '../App/AppProvider';
import { fontSize2, blueBoxShadow, color3 } from '../Shared/Styles';

const ConfirmButtonStyled = styled.div`
  margin: 20px;
  color: ${color3};
  ${fontSize2};
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  ${blueBoxShadow}
`;

export const CenterDiv = styled.div`
  display: grid;
  justify-content: center;
`;

function ConfirmButton() {
  return (
    <AppContext.Consumer>
      {({ confirmFavorites }) => (
        <CenterDiv>
          <ConfirmButtonStyled onClick={confirmFavorites}>
            Confirm Favorites
          </ConfirmButtonStyled>
        </CenterDiv>
      )}
    </AppContext.Consumer>
  );
}

export default ConfirmButton;
