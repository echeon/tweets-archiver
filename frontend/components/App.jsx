import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import ResultView from './ResultView';
import SearchView from './SearchView';
import * as API from '../utils/api_util';
import uuidV4 from 'uuid/V4';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      app: 'twitter',
      loading: false,
      error: null,
      data: [],
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
    this.setState({ loading: true });

    API.fetchTweets({ ...data, channel })

    var source = new EventSource(`/api/search_tweets?channel=${channel}`)
    source.addEventListener(channel, event => {
      const data = JSON.parse(event.data)
      console.log(data.tweets.length);
      this.tweets = this.tweets.concat(data.tweets);
      if (data.status === 'DONE') {
        this.setState({ data: this.tweets, loading: false });
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
          numTweets={this.tweets.length}
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
