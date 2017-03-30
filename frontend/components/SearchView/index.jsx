import React from 'react';
import SearchParameterList from './SearchParameterList';
import searchRules from './searchRules';

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

  handleClick(e) {
    e.preventDefault();
    const query = this.generateQuery();
    this.props.handleClick(query);
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
      <button type="button" className="btn btn-primary btn-block" onClick={this.handleClick} disabled={loading}>SEARCH</button>
    )

    const downloadButton = (
      <button type="button" className="btn btn-success btn-block" onClick={this.handleClick} disabled={true}>DOWNLOAD</button>
    )

    const resetButton = (
      <button type="button" className="btn btn-danger btn-block" onClick={this.handleClick} disabled={true}>RESET</button>
    )

    const { query, since, until } = this.state;

    return (
      <aside className='search-pane'>
        <h1 style={{fontFamily: 'Cabin Sketch', textAlign: 'center', fontWeight: 700}}>Search Tweets</h1>
        <article>
          <form>
            <div class="form-group">
              <label for="search-query">
                <input onChange={this.handleChange('query')} class="form-control" type="text" value={query} id="search-query" placeholder="Search"/>
              </label>
            </div>
            <div class="form-group">
              <label for="date-since">
                Since
                <input onChange={this.handleChange('since')} class="form-control" type="date" value={since} id="date-since"/>
              </label>
            </div>
            <div class="form-group">
              <label for="date-until">
                Until
                <input onChange={this.handleChange('until')} class="form-control" type="date" value={until} id="date-until"/>
              </label>
            </div>
          </form>
        </article>
        <div>
          {
            loading ?
            <h4 style={{textAlign: 'center'}}>Loading...</h4> :
            <h4 style={{textAlign: 'center'}}>{numTweets} tweets found</h4>
          }
          </div>
        <section>
          {searchButton}
          {downloadButton}
          {resetButton}
        </section>
      </aside>
    )
  }
}
