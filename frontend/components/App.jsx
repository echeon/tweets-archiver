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

  componentDidMount() {
    this.fetchSearchResult();
  }

  fetchSearchResult() {
    fetch('/api/search_tweets')
    .then(res => res.json())
    .then(tweets => {
      this.setState({ tweets });
      // console.log(JSON.stringify(tweets));
    })
  }

  handleClick() {
    // this.fetchSearchResult();
  }

  render() {
    const style = {
      // display: 'flex',
      // flexDirection: 'flex-row',
      // width: '100%',
      height: '100%',
      border: '3px solid blue',
    }

    return (
      // <SearchView handleClick={this.handleClick}/>
      <div style={style}>
        <ResultView tweets={this.state.tweets}/>
      </div>
    )
  }
}
