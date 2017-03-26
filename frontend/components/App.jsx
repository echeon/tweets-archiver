import React from 'react';
import ReactDOM from 'react-dom';
import ResultView from './ResultView';
import SearchView from './SearchView';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      tweets: [],
    }
    this.handleClick = this.handleClick.bind(this);
  }

  fetchSearchResult(query) {
    $.ajax({
      method: 'GET',
      url: '/api/search_tweets',
      data: { query },
    })
    .then(tweets => {
      this.setState({ tweets, loading: false });
    })
  }

  handleClick(query) {
    this.setState({ loading: true });
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
        <ResultView loading={this.state.loading} tweets={this.state.tweets}/>
      </div>
    )
  }
}
