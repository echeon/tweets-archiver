import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
  constructor() {
    super();
  }

  fetchResult() {
    fetch('/api/search_tweets', {
      body: {
        hello: 'world',
      }
    })
    .then(res => res.json())
    .then(json => console.log(json))
  }

  render() {
    this.fetchResult()

    return (
      <div>
        <h1>Hello!</h1>
      </div>
    )
  }
}
