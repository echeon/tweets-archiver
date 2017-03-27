import React from 'react';
import { Cell } from 'fixed-data-table-2';
import dateFormat from 'dateformat';
import { getValue } from './helpers';


export const TextCell = ({data, rowIndex, accessor, ...props}) => {
  const row = data[rowIndex];
  const value = getValue(row, accessor);
  // if (typeof accessor === 'function') {
  //   value = accessor(row)
  // } else if (typeof accessor === 'array') {
  //   value = getNestedValue(row, accessor);
  // } else if (typeof accessor === 'string') {
  //   value = row[accessor];
  // }
  // const value = getNestedValue(row, accessor);
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
          <a href={`https://twitter.com/${data[rowIndex].user.screen_name}/status/${data[rowIndex].id_str}`} target="_blank">{value}</a>
        </Cell>
      );
    default:
      return <Cell {...props}>{value}</Cell>;
  };
};
