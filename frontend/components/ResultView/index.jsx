import React from 'react';
import ResultTwitter from './ResultTwitter';

export default class SearchView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableWidth: 0,
      tableHeight: 0,
    };
    this.updateTableSize = this.updateTableSize.bind(this);
    this.renderSearchResult = this.renderSearchResult.bind(this);
  }

  componentDidMount() {
    this.updateTableSize();
    $(window).on('resize', () => { this.updateTableSize(); });
  }

  componentWillUnmount() {
    $(window).off('resize');
  }

  updateTableSize() {
    const tableWidth = $('#search-result').width();
    const tableHeight = $('#search-result').height();
    this.setState({ tableWidth, tableHeight });
  }

  renderSearchResult() {
    const { tableWidth, tableHeight } = this.state;
    const { app } = this.props;

    switch(app) {
      case "twitter":
        return <ResultTwitter {...this.props} tableWidth={tableWidth} tableHeight={tableHeight}/>;
    }
  }

  render() {
    return (
      <main id="search-result">
        {this.renderSearchResult()}
      </main>
    )
  }
}
