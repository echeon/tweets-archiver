import React from 'react';

export default class SearchParameterList extends React.Component {
  constructor(props) {
    super(props);
  }

  renderSearchRule(data) {
    return (
      <label>
        <h3>{data.name} (<span>e.g. {data.example}</span>)</h3>
        <input type="text" name="name" />
      </label>

    )
  }

  render() {
    const { searchRules } = this.props;

    const style = {
      width: '100%',
      backgroundColor: 'green'
    }

    return (
      <div style={style}>
        <form>
          {searchRules.map(this.renderSearchRule)}
        </form>
      </div>
    )
  }
}
