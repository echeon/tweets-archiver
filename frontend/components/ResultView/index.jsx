import React from 'react';
import data from './sampleData';
import { Table, ColumnGroup, Column, Cell } from 'fixed-data-table-2';
import { TextCell, DateCell, TimeCell, BoolCell, LinkCell } from './cells';
import { sortTypes, SortHeaderCell } from './headerCells';
import { getValue, sortArrayByIndexes, spaceship } from './helpers';

const DEFAULT_COLUMN_WIDTH = 100;

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
        dateCreated: DEFAULT_COLUMN_WIDTH,
        timeCreated: DEFAULT_COLUMN_WIDTH,
        screenName: DEFAULT_COLUMN_WIDTH,
        name: DEFAULT_COLUMN_WIDTH,
        tweetText: DEFAULT_COLUMN_WIDTH,
        numRetweets: DEFAULT_COLUMN_WIDTH,
        numFollowers: DEFAULT_COLUMN_WIDTH,
        numFollows: DEFAULT_COLUMN_WIDTH,
        numFavorites: DEFAULT_COLUMN_WIDTH,
        verified: DEFAULT_COLUMN_WIDTH,
        memberSince: DEFAULT_COLUMN_WIDTH,
        location: DEFAULT_COLUMN_WIDTH,
        bio: DEFAULT_COLUMN_WIDTH,
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
      <div id="table-wrapper" style={{width: '100%'}}>
        <div>
          {
            loading ?
            <h3 style={{textAlign: 'center'}}>Loading...</h3> :
            <h3 style={{textAlign: 'center'}}>{this.data.length} tweets found.</h3>
          }
          <h4 style={{fontWeight: 'normal', textAlign: 'center'}}>(Click column name to sort. Only <em>#Followers</em> and <em>#Follows</em> are supported now.)</h4>
        </div>
        <Table
          rowHeight={50}
          rowsCount={this.data.length}
          width={tableWidth}
          height={500}
          groupHeaderHeight={50}
          headerHeight={50}
          onColumnResizeEndCallback={this._onColumnResizeEndCallback}
          isColumnResizing={false}
        >
          <ColumnGroup
            header={<Cell>Tweet Details</Cell>}
          >
            <Column
              columnKey="dateCreated"
              header={<Cell>Date</Cell>}
              isResizable={true}
              width={columnWidths.dateCreated}
              flexGrow={1}
              cell={<DateCell data={sortedData} accessor={['created_at']}/>}
            />
            <Column
              columnKey="timeCreated"
              header={<Cell>Time</Cell>}
              isResizable={true}
              width={columnWidths.timeCreated}
              flexGrow={1}
              cell={<TimeCell data={sortedData} accessor={['created_at']}/>}
            />
            <Column
              columnKey="screenName"
              header={<Cell>Screen Name</Cell>}
              isResizable={true}
              width={columnWidths.screenName}
              flexGrow={1}
              cell={<LinkCell data={sortedData} accessor={['user', 'screen_name']} linkType='user'/>}
            />
            <Column
              columnKey="name"
              header={<Cell>Name</Cell>}
              isResizable={true}
              width={columnWidths.name}
              flexGrow={1}
              cell={<TextCell data={sortedData} accessor={['user', 'name']}/>}
            />
            <Column
              columnKey="tweetText"
              header={<Cell>Tweet Text</Cell>}
              isResizable={true}
              width={columnWidths.tweetText}
              flexGrow={5}
              cell={<LinkCell data={sortedData} accessor={['text']} linkType='tweet'/>}
            />
            <Column
              columnKey="numRetweets"
              header={<Cell># Retweets</Cell>}
              isResizable={true}
              width={columnWidths.numRetweets}
              flexGrow={1}
              cell={<TextCell data={sortedData} accessor={['retweet_count']}/>}
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
                  accessor={d => d.user.followers_count}
                >
                  # Followers
                </SortHeaderCell>}
              isResizable={true}
              width={columnWidths.numFollowers}
              flexGrow={1}
              cell={<TextCell data={sortedData} accessor={['user', 'followers_count']}/>}
            />
            <Column
              columnKey="numFollows"
              header={
                <SortHeaderCell
                  onSortChange={this._onSortChange}
                  sortDir={colSortDirs.numFollows}
                  accessor={d => d.user.friends_count}
                >
                  # Follows
                </SortHeaderCell>
              }
              isResizable={true}
              width={columnWidths.numFollows}
              flexGrow={1}
              cell={<TextCell data={sortedData} accessor={['user', 'friends_count']}/>}
            />
            <Column
              columnKey="numFavorites"
              header={<Cell># Favorites</Cell>}
              isResizable={true}
              width={columnWidths.numFavorites}
              flexGrow={1}
              cell={<TextCell data={sortedData} accessor={['user', 'favourites_count']}/>}
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
              cell={<DateCell data={sortedData} accessor={['user', 'created_at']}/>}
            />
            <Column
              columnKey="location"
              header={<Cell>Location</Cell>}
              isResizable={true}
              width={columnWidths.location}
              flexGrow={1}
              cell={<TextCell data={sortedData} accessor={['user', 'location']}/>}
            />
            <Column
              columnKey="bio"
              header={<Cell>Bio</Cell>}
              isResizable={true}
              width={columnWidths.bio}
              flexGrow={1}
              cell={<TextCell data={sortedData} accessor={['user', 'description']}/>}
            />
          </ColumnGroup>
        </Table>
      </div>
    )
  }
}
