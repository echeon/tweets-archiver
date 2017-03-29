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
    const searchBar = (
      <input
        value={this.state.query}
        onChange={this.handleChange('query')}
        type="text"
        style={{width: '100%', maxWidth: '500px', height: '20px'}}
      />
    )

    const searchButton = (
      <button style={{marginLeft: '20px', height: '20px'}} onClick={this.handleClick}>SEARCH</button>
    )

    const searchAndDownloadButton = (
      <button style={{marginLeft: '20px', height: '20px'}} onClick={this.handleClick}>SEARCH & DOWNLOAD</button>
    )

    return (
      <div style={{marginBottom: 20}}>
        <h1 style={{textAlign: 'center'}}>Search Tweets</h1>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          {searchBar}
          {searchButton}
          {searchAndDownloadButton}
        </div>
      </div>
    )
  }
}
