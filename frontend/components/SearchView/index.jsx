import React from 'react';
import SearchParameterList from './SearchParameterList';
import searchRules from './searchRules';

export default class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    this.props.handleClick(e);
  }

  render() {
    const { handleClick } = this.props;

    const style = {
      display: 'inline-block',
      width: '300px',
      padding: 10,
      backgroundColor: 'lightgreen'
    }

    return (
      <div style={{float: 'left', width: '40%'}}>
        <h1>Search Rules</h1>
        <SearchParameterList searchRules={searchRules}/>
        <button onClick={this.handleClick}>SEARCH</button>
      </div>
    )
  }
}
