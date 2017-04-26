import React from 'react';
import ResultTwitter from './ResultTwitter';

export default class SearchView extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSearchResult() {
    switch(this.props.app) {
      case "twitter":
        return <ResultTwitter {...this.props} />;
    }
  }

  render() {
    return (
      <main id="search-result" className="container-fluid">
        {this.renderSearchResult()}
      </main>
    )
  }
}
