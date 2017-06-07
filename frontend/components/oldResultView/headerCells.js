import React from 'react';
import { Cell } from 'fixed-data-table-2';

export const sortTypes = {
  ASC: 'ASC',
  DESC: 'DESC',
};

const reverseSortDirection = sortDir => sortDir === sortTypes.DESC ? sortTypes.ASC : sortTypes.DESC;

export class SortHeaderCell extends React.Component {
  constructor(props) {
    super(props);
    this._onSortChange = this._onSortChange.bind(this);
  }

  render() {
    const { onSortChange, sortDir, children, ...props } = this.props;
    return (
      <Cell {...props}>
        <a onClick={this._onSortChange}>
          {children}
          {sortDir ? (sortDir === sortTypes.DESC ? '↓' : '↑') : ''}
        </a>
      </Cell>
    );
  }

  _onSortChange(e) {
    e.preventDefault();

    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.columnKey,
        this.props.sortDir ? reverseSortDirection(this.props.sortDir) : sortTypes.DESC,
        this.props.accessor
      );
    }
  }
}
