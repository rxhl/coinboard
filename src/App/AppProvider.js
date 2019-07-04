import React, { Component } from 'react';
import cryptocompare from 'cryptocompare';
import _ from 'lodash';
import moment from 'moment';

export const AppContext = React.createContext();

const MAX_FAVS = 10;
const TIME_UNITS = 10;

export class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'dashboard',
      favorites: ['ETH', 'BTC', 'LTC', 'DOGE'],
      setPage: this.setPage,
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isFavorite: this.isFavorite,
      firstVisit: false,
      timeInterval: 'months',
      confirmFavorites: this.confirmFavorites,
      setFilteredCoins: this.setFilteredCoins,
      setCurrentFavorite: this.setCurrentFavorite,
      changeChartSelect: this.changeChartSelect,
      ...this.savedSettings()
    };
  }

  addCoin = key => {
    let favorites = [...this.state.favorites];
    if (favorites.length < MAX_FAVS) {
      favorites.push(key);
      this.setState({ favorites });
    }
  };

  removeCoin = key => {
    let favorites = [...this.state.favorites];
    this.setState({ favorites: _.pull(favorites, key) });
  };

  isFavorite = key => _.includes(this.state.favorites, key);

  componentDidMount = () => {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
  };

  fetchCoins = async () => {
    let coinList = (await cryptocompare.coinList()).Data;
    this.setState({ coinList });
  };

  fetchPrices = async () => {
    if (this.state.firstVisit) {
      return;
    }
    let prices = await this.prices();
    this.setState({ prices });
  };

  fetchHistorical = async () => {
    if (this.state.firstVisit) return;

    let results = await this.historical();
    let historical = [
      {
        name: this.state.currentFavorite,
        data: results.map((ticker, index) => {
          return [
            moment()
              .subtract({ [this.state.timeInterval]: TIME_UNITS - index })
              .valueOf(),
            ticker.USD
          ];
        })
      }
    ];
    this.setState({ historical });
  };

  historical = () => {
    let promises = [];
    for (let unit = TIME_UNITS; unit > 0; unit--) {
      promises.push(
        cryptocompare.priceHistorical(
          this.state.currentFavorite,
          ['USD'],
          moment()
            .subtract({ [this.state.timeInterval]: unit })
            .toDate()
        )
      );
    }
    return Promise.all(promises);
  };

  prices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      try {
        let priceData = await cryptocompare.priceFull(
          this.state.favorites[i],
          'USD'
        );
        returnData.push(priceData);
      } catch (e) {
        throw e;
      }
    }
    return returnData;
  };

  setFilteredCoins = filteredCoins => this.setState({ filteredCoins });

  setPage = page => this.setState({ page });

  setCurrentFavorite = sym => {
    this.setState(
      {
        currentFavorite: sym,
        historical: null
      },
      this.fetchHistorical
    );
    localStorage.setItem(
      'coinboardData',
      JSON.stringify({
        ...JSON.parse(localStorage.getItem('coinboardData')),
        currentFavorite: sym
      })
    );
  };

  changeChartSelect = value => {
    this.setState(
      { timeInterval: value, historical: null },
      this.fetchHistorical
    );
  };

  confirmFavorites = () => {
    const currentFavorite = this.state.favorites[0];
    this.setState(
      {
        firstVisit: false,
        page: 'dashboard',
        currentFavorite,
        prices: null,
        historical: null
      },
      () => {
        this.fetchPrices();
        this.fetchHistorical();
      }
    );
    localStorage.setItem(
      'coinboard',
      JSON.stringify({
        favorites: this.state.favorites,
        currentFavorite
      })
    );
  };

  savedSettings = () => {
    let coinboardData = JSON.parse(localStorage.getItem('coinboard'));
    if (!coinboardData) {
      return { page: 'settings', firstVisit: true };
    }
    let { favorites, currentFavorite } = coinboardData;
    return { favorites, currentFavorite };
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
