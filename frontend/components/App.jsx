import React from 'react';
import ReactDOM from 'react-dom';
import ResultView from './ResultView';
import SearchView from './SearchView';
import * as API from '../util/api_util';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: null,
      tweets: [],
    }
    this.handleClick = this.handleClick.bind(this);
    this.searchTweets = this.searchTweets.bind(this);
    this.downloadTweets = this.downloadTweets.bind(this);
  }

  searchTweets(data) {
    API.fetchTweets(data)
    .then(tweets => {
      console.log("time", Date.now() - this.state.now);
      this.setState({ tweets, loading: false, error: null, });
    })
    .catch(error => {
      this.setState({ loading: false, error: "Error. Try Again.", });
    })
  }

  downloadTweets(data) {
    API.downloadTweets(data)
  }

  handleClick(action) {
    return data => {
      this.setState({ loading: true, now: Date.now() });
      if (action === 'search') {
        this.searchTweets(data);
      }
    }
  }

  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header className="mdl-layout__header">
          <div aria-expanded="false" role="button" tabindex="0" className="mdl-layout__drawer-button">
            <i className="material-icons">search</i>
          </div>
          <div className="mdl-layout__header-row">
            <div className="mdl-layout-spacer"></div>
            <span className="mdl-layout-title">Tweets Archiver</span>
          </div>
        </header>
        <SearchView
          loading={this.state.loading}
          error={this.state.error}
          numTweets={this.state.tweets.length}
          handleClick={this.handleClick}
        />
        <ResultView
          loading={this.state.loading}
          tweets={this.state.tweets}
        />
      </div>
    )
  }
}
