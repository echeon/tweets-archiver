import React from 'react';
import { Table, Column, AutoSizer } from 'react-virtualized';
import ReactTable from 'react-table';
import data from './data';
import dateFormat from 'dateformat';

const columns = [
  {
    header: 'Tweet Detail',
    columns: [
      {
        header: 'Date',
        id: 'date',
        accessor: 'created_at',
        render: ({ value }) => dateFormat(new Date(value), "yyyy-mm-dd"),
      },
      {
        header: 'Time',
        id: 'time',
        accessor: 'created_at',
        render: ({ value }) => dateFormat(new Date(value), "hh:MM:ss TT"),
      },
      {
        header: 'Screen Name',
        id: 'screenName',
        accessor: d => d.user.screen_name,
        render: ({ value }) => (
          <a href={`https://twitter.com/${value}`} target="_blank">@{value}</a>
        ),
      },
      {
        header: 'Name',
        id: 'name',
        accessor: d => d.user.name,
      },
      {
        header: 'Tweet Text',
        id: 'tweetTest',
        accessor: 'text',
        render: ({ value, row }) => (
          <a href={`https://twitter.com/${row.user.screen_name}/status/${row.id_str}`} target="_blank">{value}</a>
        )
      },
      {
        header: '# Retweets',
        id: 'numRetweets',
        accessor: d => d.retweet_count,
      },
    ]
  },
  {
    header: 'User Detail',
    columns: [
      {
        header: '# Followers',
        id: 'numFollowers',
        accessor: d => d.user.followers_count,
      },
      {
        header: '# Follows',
        id: 'numFollows',
        accessor: d => d.user.friends_count,
      },
      {
        header: '# Favorites',
        id: 'numFavorites',
        accessor: d => d.user.favourites_count,
      },
      {
        header: 'Verified',
        id: 'verified',
        accessor: d => d.verified,
        render: ({ value }) => value ? 'Yes' : 'No',
      },
      {
        header: 'User Since',
        id: 'userSince',
        accessor: d => d.user.created_at,
        render: ({ value }) => dateFormat(new Date(value), "yyyy-mm-dd"),
      },
      {
        header: 'Location',
        id: 'location',
        accessor: d => d.user.location,
      },
      {
        header: 'Bio',
        id: 'bio',
        accessor: d => d.user.description,
      },
    ]
  },
]


export default class ResultView extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log(data);

    return (
      <div>
        <div style={{width: '100%', border: '5px solid red'}}>
            <ReactTable
              className="-striped -highlight"
              data={data}
              columns={columns}
              defaultPageSize={10}
            />
        </div>
      </div>
    )
  }
}
