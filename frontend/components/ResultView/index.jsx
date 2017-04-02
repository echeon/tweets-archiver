import React from 'react';
import data from './sampleData';
import { Table, ColumnGroup, Column, Cell } from 'fixed-data-table-2';
import { TextCell, DateCell, TimeCell, BoolCell, LinkCell } from './cells';
import { sortTypes, SortHeaderCell } from './headerCells';
import { getValue, sortArrayByIndexes, spaceship } from './helpers';

export default class ResultView extends React.Component {
  constructor(props) {
    super(props);
    this.data = props.tweets;
    // this.data = data;
    this.defaultSortIndexes = this.getDefaultSortIndexes(props.tweets.length);
    // this.defaultSortIndexes = this.getDefaultSortIndexes(data.length);
    this.state = {
      sortedData: props.tweets,
      tableWidth: 1000,
      tableHeight: 1000,
      columnWidths: {
        dateCreated: 100,
        timeCreated: 80,
        screenName: 120,
        name: 120,
        tweetText: 350,
        numRetweets: 100,
        numFollowers: 100,
        numFollows: 100,
        numFavorites: 100,
        verified: 80,
        memberSince: 110,
        location: 100,
        bio: 100,
      },
      colSortDirs: {},
    };
    this._updateTableSize = this._updateTableSize.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
    this._onSortChange = this._onSortChange.bind(this);
  }

  getDefaultSortIndexes(size) {
    const array = new Array(size);
    for (let i = 0; i < size; i++) { array[i] = i; }
    return array;
  }

  componentDidMount() {
    this._updateTableSize();
    $(window).on('resize', () => { this._updateTableSize(); });
  }

  componentWillReceiveProps(nextProps) {
    this.data = nextProps.tweets;
    this.defaultSortIndexes = this.getDefaultSortIndexes(nextProps.tweets.length)
    this.setState({
      sortedData: nextProps.tweets,
      colSortDirs: {},
    })
  }

  componentWillUnmount() {
    $(window).off('resize');
  }

  _updateTableSize() {
    const tableWidth = $('#table-wrapper').width();
    const tableHeight = $('#table-wrapper').height();
    this.setState({ tableWidth, tableHeight });
  }

  _onColumnResizeEndCallback(newColumnWidth, columnKey) {
    this.setState(({columnWidths}) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      }
    }));
  }

  _onSortChange(columnKey, sortDir, accessor) {
    let sortIndexes = this.defaultSortIndexes.slice();
    sortIndexes.sort((rowIndexA, rowIndexB) => {
      const valueA = getValue(this.data[rowIndexA], accessor);
      const valueB = getValue(this.data[rowIndexB], accessor);

      const x = spaceship(valueA, valueB);
      return sortDir === sortTypes.ASC ? x : -x;
    });

    this.setState({
      sortedData: sortArrayByIndexes(this.data, sortIndexes),
      colSortDirs: {
        [columnKey]: sortDir,
      },
    });
  }

  render() {
    const { loading } = this.props;
    const { tableWidth, tableHeight, columnWidths, colSortDirs, sortedData } = this.state;

    return (
      <main id="table-wrapper" className="mdl-layout__content">
        {
          (this.data.length === 0) ? <h1 className="no-data-text">NO DATA</h1> : null
        }
        <Table
          rowHeight={30}
          rowsCount={this.data.length}
          width={tableWidth}
          height={tableHeight}
          groupHeaderHeight={30}
          headerHeight={30}
          onColumnResizeEndCallback={this._onColumnResizeEndCallback}
          isColumnResizing={false}
        >
          <ColumnGroup
            header={<Cell>Tweet Details</Cell>}
          >
            <Column
              columnKey="dateCreated"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.dateCreated}
                  accessor={d => d.date_created}
                >
                  Date
                </SortHeaderCell>
              }
              isResizable={true}
              width={columnWidths.dateCreated}
              flexGrow={1}
              cell={<TextCell data={sortedData} accessor={['date_created']}/>}
            />
            <Column
              columnKey="timeCreated"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.timeCreated}
                  accessor={d => d.time_created}
                >
                  Time
                </SortHeaderCell>
              }
              isResizable={true}
              width={columnWidths.timeCreated}
              flexGrow={1}
              cell={<TextCell data={sortedData} accessor={['time_created']}/>}
            />
            <Column
              columnKey="screenName"
              header={<Cell>Screen Name</Cell>}
              isResizable={true}
              width={columnWidths.screenName}
              flexGrow={1}
              cell={<LinkCell data={sortedData} accessor={['screen_name']} linkType='user'/>}
            />
            <Column
              columnKey="name"
              header={<Cell>Name</Cell>}
              isResizable={true}
              width={columnWidths.name}
              flexGrow={1}
              cell={<TextCell data={sortedData} accessor={['user_name']}/>}
            />
            <Column
              columnKey="tweetText"
              header={<Cell>Tweet</Cell>}
              isResizable={true}
              width={columnWidths.tweetText}
              flexGrow={5}
              cell={<LinkCell data={sortedData} accessor={['tweet']} linkType='tweet'/>}
            />
            <Column
              columnKey="numRetweets"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.numRetweets}
                  accessor={d => d.number_retweets}
                >
                  # Retweets
                </SortHeaderCell>
              }
              isResizable={true}
              width={columnWidths.numRetweets}
              flexGrow={1}
              cell={<TextCell data={sortedData} accessor={['number_retweets']}/>}
            />
          </ColumnGroup>
          <ColumnGroup
            header={<Cell>User Details</Cell>}
          >
            <Column
              columnKey="numFollowers"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.numFollowers}
                  accessor={d => d.number_followers}
                >
                  # Followers
                </SortHeaderCell>}
              isResizable={true}
              width={columnWidths.numFollowers}
              flexGrow={1}
              cell={<TextCell data={sortedData} accessor={['number_followers']}/>}
            />
            <Column
              columnKey="numFollows"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.numFollows}
                  accessor={d => d.number_follows}
                >
                  # Follows
                </SortHeaderCell>
              }
              isResizable={true}
              width={columnWidths.numFollows}
              flexGrow={1}
              cell={<TextCell data={sortedData} accessor={['number_follows']}/>}
            />
            <Column
              columnKey="numFavorites"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.numFavorites}
                  accessor={d => d.number_favorites}
                >
                  # Favorites
                </SortHeaderCell>
              }
              isResizable={true}
              width={columnWidths.numFavorites}
              flexGrow={1}
              cell={<TextCell data={sortedData} accessor={['number_favorites']}/>}
            />
            <Column
              columnKey="verified"
              header={<Cell>Verified</Cell>}
              isResizable={true}
              width={columnWidths.verified}
              flexGrow={1}
              cell={<BoolCell data={sortedData} accessor={['verified']}/>}
            />
            <Column
              columnKey="memberSince"
              header={<Cell>Member Since</Cell>}
              isResizable={true}
              width={columnWidths.memberSince}
              flexGrow={1}
              cell={<DateCell data={sortedData} accessor={['member_since']}/>}
            />
            <Column
              columnKey="location"
              header={<Cell>Location</Cell>}
              isResizable={true}
              width={columnWidths.location}
              flexGrow={1}
              cell={<TextCell data={sortedData} accessor={['user_location']}/>}
            />
            <Column
              columnKey="bio"
              header={<Cell>Bio</Cell>}
              isResizable={true}
              width={columnWidths.bio}
              flexGrow={1}
              cell={<TextCell data={sortedData} accessor={['user_description']}/>}
            />
          </ColumnGroup>
        </Table>
      </main>
    )
  }
}
