import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import ResultView from './ResultView';
import SearchView from './SearchView';
import * as API from '../utils/api_util';
import uuidV4 from 'uuid/v4';
import qs from 'qs';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      app: 'twitter',
      loading: false,
      error: null,
      data: [],
      dataLength: 0,
    }
    this.tweets = [];
    this.changeApp = this.changeApp.bind(this);
    this.searchTweets = this.searchTweets.bind(this);
    this.downloadTweets = this.downloadTweets.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  searchTweets(data) {
    const channel = uuidV4();

    this.tweets = [];
    this.setState({ data: [], dataLength: 0, loading: true });

    API.fetchTweets({ ...data, channel })

    const str = qs.stringify({ ...data, channel })
    var source = new EventSource(`/api/search_tweets?${str}`)
    source.addEventListener(channel, event => {
      const data = JSON.parse(event.data)
      this.tweets = this.tweets.concat(data.tweets);
      this.setState({ dataLength: this.state.dataLength + data.tweets.length })
      if (data.status === 'DONE') {
        this.setState({ data: this.tweets, error: null, loading: false });
        source.close();
      }
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
      <div>
        <Header
          app={app}
          changeApp={this.changeApp}
        />
        <SearchView
          app={app}
          loading={this.state.loading}
          error={this.state.error}
          numTweets={this.state.dataLength}
          handleClick={this.handleClick}
        />
        <ResultView
          app={app}
          loading={this.state.loading}
          data={this.state.data}
        />
      </div>
    )
  }
}
