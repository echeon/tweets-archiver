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
    const style = {
      // display: 'flex',
      // flexDirection: 'flex-row',
    }
    return (
      <div style={style}>
        <SearchView handleClick={this.handleClick}/>
        <ResultView
          loading={this.state.loading}
          tweets={this.state.tweets}
        />
      </div>
    )
  }
}
