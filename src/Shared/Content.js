import React from 'react';
import { AppContext } from '../App/AppProvider';

export default function(props) {
  return (
    <AppContext.Consumer>
      {({ coinList, prices, firstVisit }) => {
        if (!coinList || (!prices && !firstVisit)) {
          return (
            <div>
              <div className="lds-roller">
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
                <div />
              </div>
            </div>
          );
        }
        return <div>{props.children}</div>;
      }}
    </AppContext.Consumer>
  );
}
