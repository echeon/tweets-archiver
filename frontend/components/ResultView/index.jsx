import React from 'react';
import data from './data';
import { Table, ColumnGroup, Column, Cell } from 'fixed-data-table-2';
import { TextCell, DateCell, TimeCell, BoolCell, LinkCell } from './cells';

export default class ResultView extends React.Component {
  constructor() {
    super();
    this.state = {
      cellWidth: 100,
      tableWidth: 1000,
      tableHeight: 1000,
    }
    this.updateTableSize = this.updateTableSize.bind(this);
  }

  componentDidMount() {
    this.updateTableSize();
    $(window).on('resize', () => { this.updateTableSize(); });
  }

  componentWillUnmount() {
    $(window).off('resize');
  }

  updateTableSize() {
    const tableWidth = $('#table-wrapper').width();
    const tableHeight = $('#table-wrapper').height();
    this.setState({ tableWidth, tableHeight });
  }


  render() {
    // const { tweets: data, loading } = this.props;
    return (
      <div id="table-wrapper" style={{width: '100%', border: '3px solid red', boxSizing: 'border-box'}}>
        <button onClick={this.makeItBigger}></button>
        <Table
          rowHeight={50}
          rowsCount={data.length}
          width={this.state.tableWidth}
          height={this.state.tableHeight}
          groupHeaderHeight={50}
          headerHeight={50}
        >
          <ColumnGroup
            header={<Cell>Tweet Details</Cell>}
          >
            <Column
              columnKey="dateCreated"
              header={<Cell>Date</Cell>}
              width={this.state.cellWidth}
              flexGrow={1}
              cell={<DateCell data={data} accessor={['created_at']}/>}
            />
            <Column
              columnKey="timeCreated"
              header={<Cell>Time</Cell>}
              width={this.state.cellWidth}
              flexGrow={1}
              cell={<TimeCell data={data} accessor={['created_at']}/>}
            />
            <Column
              columnKey="screenName"
              header={<Cell>Screen Name</Cell>}
              width={this.state.cellWidth}
              flexGrow={1}
              cell={<LinkCell data={data} accessor={['user', 'screen_name']} linkType='user'/>}
            />
            <Column
              columnKey="name"
              header={<Cell>Name</Cell>}
              width={this.state.cellWidth}
              flexGrow={1}
              cell={<TextCell data={data} accessor={['user', 'name']}/>}
            />
            <Column
              columnKey="tweetText"
              header={<Cell>Tweet Text</Cell>}
              width={this.state.cellWidth}
              flexGrow={5}
              cell={<LinkCell data={data} accessor={['text']} linkType='tweet'/>}
            />
            <Column
              columnKey="numRetweets"
              header={<Cell># Retweets</Cell>}
              width={this.state.cellWidth}
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
              width={this.state.cellWidth}
              flexGrow={1}
              cell={<TextCell data={data} accessor={['user', 'followers_count']}/>}
            />
            <Column
              columnKey="numFollows"
              header={<Cell># Follows</Cell>}
              width={this.state.cellWidth}
              flexGrow={1}
              cell={<TextCell data={data} accessor={['user', 'friends_count']}/>}
            />
            <Column
              columnKey="numFavorites"
              header={<Cell># Favorites</Cell>}
              width={this.state.cellWidth}
              flexGrow={1}
              cell={<TextCell data={data} accessor={['user', 'favourites_count']}/>}
            />
            <Column
              columnKey="verified"
              header={<Cell>Verified</Cell>}
              width={this.state.cellWidth}
              flexGrow={1}
              cell={<BoolCell data={data} accessor={['verified']}/>}
            />
            <Column
              columnKey="memberSince"
              header={<Cell>Member Since</Cell>}
              width={this.state.cellWidth}
              flexGrow={1}
              cell={<DateCell data={data} accessor={['user', 'created_at']}/>}
            />
            <Column
              columnKey="location"
              header={<Cell>Location</Cell>}
              width={this.state.cellWidth}
              flexGrow={1}
              cell={<TextCell data={data} accessor={['user', 'location']}/>}
            />
            <Column
              columnKey="bio"
              header={<Cell>Bio</Cell>}
              width={this.state.cellWidth}
              flexGrow={1}
              cell={<TextCell data={data} accessor={['user', 'description']}/>}
            />
          </ColumnGroup>
        </Table>
      </div>
    )
  }
}
