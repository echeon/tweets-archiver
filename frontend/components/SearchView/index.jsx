import React from 'react';
import SearchTwitter from './SearchTwitter';

export default class SearchView extends React.Component {
  constructor(props) {
    super(props);
  }

  hideSearchMenu() {
    document.getElementById('search-menu').style.width = "0";
  }

  renderSearchMenu() {
    switch(this.props.app) {
      case "twitter":
        return <SearchTwitter {...this.props} />;
    }
  }

  render() {
    return (
      <aside id="search-menu">
        <i onClick={this.hideSearchMenu} className="fa fa-2x fa-f2 fa-times close-btn" aria-hidden="true"></i>
        {this.renderSearchMenu()}
      </aside>
    )
  }
}
