import React from 'react';
import { Cell } from 'fixed-data-table-2';
import dateFormat from 'dateformat';
import { getValue } from './helpers';


export const TextCell = ({data, rowIndex, accessor, ...props}) => {
  const value = getValue(data[rowIndex], accessor)
  return (
    <Cell {...props}>{value}</Cell>
  )
};

export const DateCell = ({data, rowIndex, accessor, ...props}) => {
  const value = getValue(data[rowIndex], accessor);
  return (
    <Cell {...props}>{dateFormat(new Date(value), 'yyyy-mm-dd')}</Cell>
  )
};

export const TimeCell = ({data, rowIndex, accessor, ...props}) => {
  const value = getValue(data[rowIndex], accessor);
  return (
    <Cell {...props}>{dateFormat(new Date(value), 'hh:MM:ss TT')}</Cell>
  )
};

export const BoolCell = ({data, rowIndex, accessor, ...props}) => {
  const value = getValue(data[rowIndex], accessor);
  return (
    <Cell {...props}>{value ? 'Yes' : 'No'}</Cell>
  )
};

export const LinkCell = ({data, rowIndex, accessor, linkType, ...props}) => {
  const value = getValue(data[rowIndex], accessor);

  switch (linkType) {
    case 'user':
      return (
        <Cell {...props}>
          <a href={`https://twitter.com/${value}`} target="_blank">@{value}</a>
        </Cell>
      );
    case 'tweet':
      return (
        <Cell {...props}>
          <a href={`https://twitter.com/${data[rowIndex].screen_name}/status/${data[rowIndex].tweet_id}`} target="_blank">{value}</a>
        </Cell>
      );
    default:
      return <Cell {...props}>{value}</Cell>;
  };
};
