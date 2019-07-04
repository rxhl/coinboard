import React from 'react';
import { AppContext } from '../App/AppProvider';

function WelcomeMessage({ firstVisit }) {
  return (
    <AppContext.Consumer>
      {({ firstVisit }) =>
        firstVisit ? (
          <div>
            Welcome to Coinboard! Please select your favorite cryptocurrencies.
          </div>
        ) : null
      }
    </AppContext.Consumer>
  );
}

export default WelcomeMessage;
