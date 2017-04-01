import React from 'react';
import SearchParameterList from './SearchParameterList';
import searchRules from './searchRules';
import queryString from 'query-string';

export default class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '@justinbieber marry me',
      since: '',
      until: '',
    }
    this.handleClick = this.handleClick.bind(this);
    this.generateQuery = this.generateQuery.bind(this);
  }

  handleClick(action) {
    return e => {
      e.preventDefault();
      const query = this.generateQuery();
      this.props.handleClick(action)(query);
    }
  }

  handleChange(prop) {
    return e => {
      e.preventDefault();
      const { value } = e.currentTarget;
      this.setState({ [prop]: value });
    };
  }

  generateQuery() {
    const { query, since, until } = this.state;
    let finalQuery = [query];
    if (since !== '') {
      finalQuery.push(`since:${since}`);
    };
    if (until !== '') {
      finalQuery.push(`until:${until}`);
    };
    return finalQuery.join(' ');
  }


  render() {
    const { loading, numTweets } = this.props;

    const searchBar = (
      <input
        value={this.state.query}
        onChange={this.handleChange('query')}
        type="text"
      />
    )

    const searchButton = (
      <a
        className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
        onClick={this.handleClick('search')}
        disabled={loading}
      >
        SEARCH
      </a>
    )

    const downloadQuery = queryString.stringify({query: this.generateQuery()})
    const downloadButton = (
      <a
        className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
        href={`/api/download_tweets?${downloadQuery}`}
        disabled={loading}
        download
      >
        DOWNLOAD
      </a>
    )

    const resetButton = (
      <a
        className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect"
        onClick={this.handleClick('reset')}
        disabled={true}
      >
        RESET
      </a>
    )

    const { query, since, until } = this.state;

    return (
      <aside className="mdl-layout__drawer">
        <div>
          <h3>Search Tweets</h3>
          <small><a href="https://dev.twitter.com/rest/public/search">Search Help from Twitter</a></small>
        </div>
        <article>
          <form>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <small>Search</small>
              <label className="mdl-textfield__label" for="search-query"></label>
              <input onChange={this.handleChange('query')} className="mdl-textfield__input" type="text" value={query} id="search-query"/>
            </div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <small>Since</small>
              <label className="mdl-textfield__label" for="date-since"></label>
              <input onChange={this.handleChange('since')} className="mdl-textfield__input" type="date" value={since} id="date-since"/>
            </div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <small>Until</small>
              <label className="mdl-textfield__label" for="date-until"></label>
              <input onChange={this.handleChange('until')} className="mdl-textfield__input" type="date" value={until} id="date-until"/>
            </div>
          </form>
        </article>
        <div>
          {
            <h4>{numTweets} tweets found</h4>
          }
        </div>
        <section>
          <div id="p2" className="mdl-progress mdl-js-progress mdl-progress__indeterminate" hidden={!loading}></div>
          {searchButton}
          {downloadButton}
          {resetButton}
        </section>
      </aside>
    )
  }
}
