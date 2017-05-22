import React from 'react';
import SearchParameterList from './SearchParameterList';
import searchRules from './searchRules';

export default class SearchTwitter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      q: '@justinbieber marry me',
      since: '',
      until: '',
      latitude: '',
      longitude: '',
      radius: 10,
    }
    this.handleClick = this.handleClick.bind(this);
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
      const { q, since, until } = this.state;
      const geocode = this.generateGeocode();
      const data = { q };
      if (since)   { data.q   = `${q} since:${since}` }
      if (until)   { data.until   = until             }
      if (geocode) { data.geocode = geocode           }
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
        value={this.state.q}
        onChange={this.handleChange('q')}
        type="text"
      />
    )

    const searchButton = (
      <a
        className="btn btn-primary btn-custom"
        onClick={this.handleClick('search')}
        disabled={loading}
      >
        SEARCH
      </a>
    )

    const downloadButton = (
      <a
        className="btn btn-success btn-custom"
        href={`/api/download_tweets?`}
        disabled={true}
        download
      >
        DOWNLOAD
      </a>
    )

    const resetButton = (
      <a
        className="btn btn-warning btn-custom"
        onClick={this.handleClick('reset')}
        disabled={true}
      >
        RESET
      </a>
    )

    const { q, since, until, location, radius } = this.state;

    return (
      <div>
        <div>
          <h3>Search Tweets</h3>
          <small><a href="https://dev.twitter.com/rest/public/search">Search Help from Twitter</a></small>
        </div>
        <article>
          <form>
            <div className="form-field">
              <label className="form-field__label" for="search-query">Search</label>
              <input onChange={this.handleChange('q')} className="form-field__input" type="text" value={q} id="search-query"/>
              <span></span>
            </div>
            <div className="form-field">
              <label className="form-field__label" for="date-since">Since</label>
              <input onChange={this.handleChange('since')} className="form-field__input" type="date" value={since} id="date-since"/>
              <span></span>
            </div>
            <div className="form-field">
              <label className="form-field__label" for="date-until">Until</label>
              <input onChange={this.handleChange('until')} className="form-field__input" type="date" value={until} id="date-until"/>
              <span></span>
            </div>
            <div className="form-field">
              <label className="form-field__label" for="search-location">Location</label>
              <input onChange={this.handleChange('location')} className="form-field__input" type="text" id="search-location"/>
              <span></span>
            </div>
            <div className="form-field">
              <label className="form-field__label" for="search-radius">Radius (in miles)</label>
              <input onChange={this.handleChange('radius')} className="form-field__input" type="number" value={radius} id="search-radius"/>
              <span></span>
            </div>
          </form>
        </article>
        <div>
          { error ? <h4>{error}</h4> : <h4>{numTweets} tweets found</h4> }
          <div id="activity-indicator">
            <div className={loading ? 'indeterminate' : ''}></div>
          </div>
        </div>
        <section>
          {searchButton}
          {downloadButton}
          {resetButton}
        </section>
      </div>
    )
  }
}
