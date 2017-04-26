import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import ResultView from './ResultView';
import SearchView from './SearchView';
import * as API from '../utils/api_util';
import StackGrid from "react-stack-grid";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      app: 'twitter',
      loading: false,
      error: null,
      tweets: [],
    }
    this.changeApp = this.changeApp.bind(this);
    this.searchTweets = this.searchTweets.bind(this);
    this.downloadTweets = this.downloadTweets.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  searchTweets(data) {
    this.intervalId = setInterval(() => {
      $.ajax({
        method: 'GET',
        url: '/',
      })
    }, 25000);
    API.fetchTweets(data)
    .then(tweets => {
      clearInterval(this.intervalId);
      this.setState({ tweets, loading: false, error: null, });
    })
    .catch(error => {
      clearInterval(this.intervalId);
      this.setState({ loading: false, error: "Error. Try Again.", });
    })
  }

  downloadTweets(data) {
    this.intervalId = setInterval(() => {
      $.ajax({
        method: 'GET',
        url: '/',
      })
    }, 25000);
    API.downloadTweets(data)
    .then(res => {
      clearInterval(this.intervalId);
    })
  }

  handleClick(action) {
    return data => {
      this.setState({ loading: true, now: Date.now() });
      if (action === 'search') {
        this.searchTweets(data);
      }
    }
  }

  changeApp(app) {
    this.setState({ app })
  }

  render() {
    const { app } = this.state;

    return (
      <div className="container-fluid">
        <Header
          app={app}
          changeApp={this.changeApp}
        />
        <SearchView
          app={app}
          loading={this.state.loading}
          error={this.state.error}
          numTweets={this.state.tweets.length}
          handleClick={this.handleClick}
        />
        <ResultView
          app={app}
          loading={this.state.loading}
          tweets={this.state.tweets}
        />
      </div>
    )
  }
}
