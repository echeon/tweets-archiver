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
      tweets: [],
    }
    this.handleClick = this.handleClick.bind(this);
    this.fetchSearchResult = this.fetchSearchResult.bind(this);
    this.searchAndDownload = this.searchAndDownload.bind(this);
  }

  fetchSearchResult(query) {
    API.fetchTweets(query)
    .then(tweets => {
      console.log("time", Date.now() - this.state.now);
      this.setState({ tweets, loading: false });
    })
    .catch(error => {
      this.setState({ loading: false });
    })
  }

  searchAndDownload(query) {
    API.fetchAndDownload(query)
    .then(tweets => {
      this.setState({ tweets, loading: false });
    })
  }

  handleClick(query) {
    this.setState({ loading: true, now: Date.now() });
    this.fetchSearchResult(query);
  }

  render() {
    return (
      <div className='main-container'>
        <SearchView
          loading={this.state.loading}
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
