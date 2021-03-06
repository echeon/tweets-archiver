import React from 'react';
// import data from './sampleData';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
  parsedDateFormatter,
  dateFormatter,
  timeFormatter,
  textFormatter,
  linkFormatter,
} from './dataFormatter';
import { sortFunc } from './helpers';

export default class ResultTwitter extends React.Component {
  constructor(props) {
    super(props);
    this.cleanFilter = this.cleanFilter.bind(this);
    this.filterByTime = this.filterByTime.bind(this);
  }

  cleanFilter() {
    this.refs.parsedDate.cleanFiltered();
  }

  filterByTime(numHours) {
    return () => {
      const timeNow = Date.now();
      const numMilliseconds = numHours * 60 * 60 * 1000;
      this.refs.parsedDate.applyFilter({
        comparator: '>=',
        number: timeNow - numMilliseconds,
      });
    }
  }

  render() {
    const { tableWidth, tableHeight } = this.props;

    const tdStyle = {
      whiteSpace: 'normal',
    };

    const options = {
      noDataText: 'No Data',
      // withoutNoDataText: true,
      defaultSortName: 'numFollowers',
      defaultSortOrder: 'desc',
      sortIndicator: false,
      paginationPosition: 'bottom',
    }

    // height={tableHeight}
    return (
      <div>
      <button onClick={this.cleanFilter}>Clear Filter</button>
      <button onClick={this.filterByTime(1)}>Last Hour</button>
      <button onClick={this.filterByTime(2)}>Last 2 Hours</button>
      <button onClick={this.filterByTime(5)}>Last 5 Hours</button>
      <BootstrapTable
        data={this.props.data}
        options={options}
        striped
        hover
        condensed
        pagination
      >
        <TableHeaderColumn
          row='0'
          rowSpan='2'
          dataField='id_str'
          isKey
          hidden
        >
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          ref='parsedDate'
          row='0'
          rowSpan='2'
          dataField='parsedDate'
          dataFormat={parsedDateFormatter('created_at')}
          filter={{type: 'NumberFilter'}}
          filterFormatted
          hidden
        >
          Full Date
        </TableHeaderColumn>
        <TableHeaderColumn
          row='0'
          colSpan='7'
          headerAlign='center'
        >
          Tweet Details
        </TableHeaderColumn>
        <TableHeaderColumn
          row='1'
          columnClassName='width-110'
          headerAlign='center'
          dataAlign='center'
          dataField='dateCreated'
          dataFormat={dateFormatter('created_at')}
          csvFormat={dateFormatter('created_at')}
          dataSort
          sortFunc={sortFunc('created_at', 'date')}
        >
          Date
        </TableHeaderColumn>
        <TableHeaderColumn
          row='1'
          columnClassName='width-110'
          headerAlign='center'
          dataAlign='center'
          dataField='timeCreated'
          dataFormat={timeFormatter('created_at')}
          csvFormat={timeFormatter('created_at')}
          dataSort
          sortFunc={sortFunc('created_at', 'time')}
        >
          Time
        </TableHeaderColumn>
        <TableHeaderColumn
          row='1'
          columnClassName='width-150'
          headerAlign='center'
          dataField='screenName'
          dataFormat={linkFormatter(['user', 'screen_name'], 'user')}
          csvFormat={linkFormatter(['user', 'screen_name'], 'userCSV')}
          tdStyle={tdStyle}
        >
          Screen Name
        </TableHeaderColumn>
        <TableHeaderColumn
          row='1'
          columnClassName='width-150'
          headerAlign='center'
          dataField='username'
          dataFormat={textFormatter(['user', 'name'])}
          csvFormat={textFormatter(['user', 'name'])}
        >
          Name
        </TableHeaderColumn>
        <TableHeaderColumn
          row='1'
          columnClassName='width-450'
          headerAlign='center'
          dataField='tweetText'
          dataFormat={linkFormatter('text', 'tweet')}
          csvFormat={linkFormatter('text', 'tweetCSV')}
          tdStyle={tdStyle}
        >
          Tweet
        </TableHeaderColumn>
        <TableHeaderColumn
          row='1'
          columnClassName='width-100'
          headerAlign='center'
          dataAlign='center'
          dataField='numRetweets'
          dataFormat={textFormatter('retweet_count')}
          csvFormat={textFormatter('retweet_count')}
          dataSort
          sortFunc={sortFunc(['retweet_count'])}
        >
          # Retweets
        </TableHeaderColumn>
        <TableHeaderColumn
          row='1'
          columnClassName='width-100'
          headerAlign='center'
          dataAlign='center'
          dataField='numLikes'
          dataFormat={textFormatter('favorite_count')}
          csvFormat={textFormatter('favorite_count')}
          dataSort
          sortFunc={sortFunc(['favorite_count'])}
        >
          # Likes
        </TableHeaderColumn>
        <TableHeaderColumn
          row='0'
          colSpan='5'
          headerAlign='center'
        >
          User Details
        </TableHeaderColumn>
        <TableHeaderColumn
          row='1'
          columnClassName='width-100'
          headerAlign='center'
          dataAlign='center'
          dataField='numFollowers'
          dataFormat={textFormatter(['user', 'followers_count'])}
          csvFormat={textFormatter(['user', 'followers_count'])}
          dataSort
          sortFunc={sortFunc(['user', 'followers_count'])}
        >
          # Followers
        </TableHeaderColumn>
        <TableHeaderColumn
          row='1'
          columnClassName='width-100'
          headerAlign='center'
          dataAlign='center'
          dataField='numFollows'
          dataFormat={textFormatter(['user', 'friends_count'])}
          csvFormat={textFormatter(['user', 'friends_count'])}
          dataSort
          sortFunc={sortFunc(['user', 'friends_count'])}
        >
          # Follows
        </TableHeaderColumn>
        <TableHeaderColumn
          row='1'
          columnClassName='width-100'
          headerAlign='center'
          dataAlign='center'
          dataField='numFavorites'
          dataFormat={textFormatter(['user', 'favourites_count'])}
          csvFormat={textFormatter(['user', 'favourites_count'])}
          dataSort
          sortFunc={sortFunc(['user', 'favourites_count'])}
        >
          # Favorites
        </TableHeaderColumn>
        <TableHeaderColumn
          row='1'
          columnClassName='width-200'
          headerAlign='center'
          dataField='location'
          dataFormat={textFormatter(['user', 'location'])}
          csvFormat={textFormatter(['user', 'location'])}
          tdStyle={tdStyle}
          >
          Location
        </TableHeaderColumn>
        <TableHeaderColumn
          row='1'
          columnClassName='width-110'
          headerAlign='center'
          dataAlign='center'
          dataField='memberSince'
          dataFormat={dateFormatter(['user', 'created_at'])}
          csvFormat={dateFormatter(['user', 'created_at'])}
          dataSort
          sortFunc={sortFunc(['user', 'created_at'], 'date')}
        >
          Member Since
        </TableHeaderColumn>
      </BootstrapTable>
      </div>
    );
  }
}
