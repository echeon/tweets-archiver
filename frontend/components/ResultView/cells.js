import React from 'react';
import { Cell } from 'fixed-data-table-2';
import dateFormat from 'dateformat';

const getValue = (data, accessor) => {
  return accessor.reduce((acc, key) => acc[key], data);
};

export const TextCell = ({data, rowIndex, accessor, ...props}) => {
  const value = getValue(data[rowIndex], accessor);
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
