import React from 'react';
import SearchParameterList from './SearchParameterList';
import searchRules from './searchRules';

export default class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '@justinbieber marry me',
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.handleClick(this.state.query);
  }

  handleChange(prop) {
    return e => {
      e.preventDefault();
      const { value } = e.currentTarget;
      this.setState({ [prop]: value });
    };
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
      <button className="btn btn-primary" onClick={this.handleClick}>SEARCH</button>
    )

    const searchAndDownloadButton = (
      <button onClick={this.handleClick}>SEARCH & DOWNLOAD</button>
    )

    return (
      <aside className='search-pane'>
        <article>
          <h1>Search Tweets</h1>
          <br/>
          <div>
            {searchBar}
            <br/>
            <br/>
            <br/>
            {false ? searchAndDownloadButton : null}
            <br/><br/><br/>
          </div>
          <div>
            {
              loading ?
              <h3>Loading...</h3> :
              <h3>{numTweets} tweets found.</h3>
            }
            <br/>
            <h4>(Click column name to sort. Only <em>#Retweets</em>, <em>#Followers</em> and <em>#Follows</em> are supported at the moment.)</h4>
          </div>
        </article>
        <section>
          {searchButton}
        </section>
      </aside>
    )
  }
}
