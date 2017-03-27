import React from 'react';
import data from './data';
import { Table, ColumnGroup, Column, Cell } from 'fixed-data-table-2';
import { TextCell, DateCell, TimeCell, BoolCell, LinkCell } from './cells';

const DEFAULT_COLUMN_WIDTH = 100;

export default class ResultView extends React.Component {
  constructor() {
    super();
    this.state = {
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
    };
    this._updateTableSize = this._updateTableSize.bind(this);
    this._onColumnResizeEndCallback = this._onColumnResizeEndCallback.bind(this);
  }

  componentDidMount() {
    this._updateTableSize();
    $(window).on('resize', () => { this._updateTableSize(); });
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

  render() {
    // const { tweets: data, loading } = this.props;

    const { tableWidth, tableHeight, columnWidths } = this.state;

    return (
      <div id="table-wrapper" style={{width: '100%'}}>
        <Table
          rowHeight={50}
          rowsCount={data.length}
          width={tableWidth}
          height={tableHeight}
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
              cell={<DateCell data={data} accessor={['created_at']}/>}
            />
            <Column
              columnKey="timeCreated"
              header={<Cell>Time</Cell>}
              isResizable={true}
              width={columnWidths.timeCreated}
              flexGrow={1}
              cell={<TimeCell data={data} accessor={['created_at']}/>}
            />
            <Column
              columnKey="screenName"
              header={<Cell>Screen Name</Cell>}
              isResizable={true}
              width={columnWidths.screenName}
              flexGrow={1}
              cell={<LinkCell data={data} accessor={['user', 'screen_name']} linkType='user'/>}
            />
            <Column
              columnKey="name"
              header={<Cell>Name</Cell>}
              isResizable={true}
              width={columnWidths.name}
              flexGrow={1}
              cell={<TextCell data={data} accessor={['user', 'name']}/>}
            />
            <Column
              columnKey="tweetText"
              header={<Cell>Tweet Text</Cell>}
              isResizable={true}
              width={columnWidths.tweetText}
              flexGrow={5}
              cell={<LinkCell data={data} accessor={['text']} linkType='tweet'/>}
            />
            <Column
              columnKey="numRetweets"
              header={<Cell># Retweets</Cell>}
              isResizable={true}
              width={columnWidths.numRetweets}
              flexGrow={1}
              cell={<TextCell data={data} accessor={['retweet_count']}/>}
            />
          </ColumnGroup>
          <ColumnGroup
            header={<Cell>User Details</Cell>}
          >
            <Column
              columnKey="numFollowers"
              header={<Cell># Followers</Cell>}
              isResizable={true}
              width={columnWidths.numFollowers}
              flexGrow={1}
              cell={<TextCell data={data} accessor={['user', 'followers_count']}/>}
            />
            <Column
              columnKey="numFollows"
              header={<Cell># Follows</Cell>}
              isResizable={true}
              width={columnWidths.numFollows}
              flexGrow={1}
              cell={<TextCell data={data} accessor={['user', 'friends_count']}/>}
            />
            <Column
              columnKey="numFavorites"
              header={<Cell># Favorites</Cell>}
              isResizable={true}
              width={columnWidths.numFavorites}
              flexGrow={1}
              cell={<TextCell data={data} accessor={['user', 'favourites_count']}/>}
            />
            <Column
              columnKey="verified"
              header={<Cell>Verified</Cell>}
              isResizable={true}
              width={columnWidths.verified}
              flexGrow={1}
              cell={<BoolCell data={data} accessor={['verified']}/>}
            />
            <Column
              columnKey="memberSince"
              header={<Cell>Member Since</Cell>}
              isResizable={true}
              width={columnWidths.memberSince}
              flexGrow={1}
              cell={<DateCell data={data} accessor={['user', 'created_at']}/>}
            />
            <Column
              columnKey="location"
              header={<Cell>Location</Cell>}
              isResizable={true}
              width={columnWidths.location}
              flexGrow={1}
              cell={<TextCell data={data} accessor={['user', 'location']}/>}
            />
            <Column
              columnKey="bio"
              header={<Cell>Bio</Cell>}
              isResizable={true}
              width={columnWidths.bio}
              flexGrow={1}
              cell={<TextCell data={data} accessor={['user', 'description']}/>}
            />
          </ColumnGroup>
        </Table>
      </div>
    )
  }
}
