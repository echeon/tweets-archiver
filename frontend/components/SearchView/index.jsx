import React from 'react';
import SearchParameterList from './SearchParameterList';
import searchRules from './searchRules';
import queryString from 'query-string';

export default class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '#nyc #coffee',
      since: '',
      until: '',
      latitude: '',
      longitude: '',
      radius: 10,
    }
    this.handleClick = this.handleClick.bind(this);
    this.generateQuery = this.generateQuery.bind(this);
    this.addListenerToAutocomplete = this.addListenerToAutocomplete.bind(this);
  }

  componentDidMount() {
    this.addListenerToAutocomplete();
  }

  addListenerToAutocomplete() {
    const input = document.getElementById('search-location');
    const autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      this.setState({
        latitude: place.geometry.location.lat(),
        longitude: place.geometry.location.lng(),
      });
    });
  }

  handleClick(action) {
    return e => {
      e.preventDefault();
      const query = this.generateQuery();
      const geocode = this.generateGeocode();
      let data = { query };
      if (geocode) { data = Object.assign({}, data, { geocode })}
      this.props.handleClick(action)(data);
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

  generateGeocode() {
    const input = document.getElementById('search-location');
    if (input.value !== '') {
      const { latitude, longitude, radius } = this.state;
      return `${latitude},${longitude},${radius}mi`;
    } else {
      return null;
    }
  }


  render() {
    const { error, loading, numTweets } = this.props;

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

    const { query, since, until, location, radius } = this.state;

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
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <small>Location</small>
              <label className="mdl-textfield__label" for="search-location"></label>
              <input onChange={this.handleChange('location')} className="mdl-textfield__input" type="text" id="search-location"/>
            </div>
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
              <small>Radius (in miles)</small>
              <label className="mdl-textfield__label" for="search-radius"></label>
              <input onChange={this.handleChange('radius')} className="mdl-textfield__input" type="number" value={radius} id="search-radius"/>
            </div>
          </form>
        </article>
        <div>
          { error ? <h4>{error}</h4> : <h4>{numTweets} tweets found</h4> }
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
