import dateFormat from 'dateformat';
import { getValue } from './helpers';

export const dateFormatter = accessor => (cell, row) => {
  const value = getValue(row, accessor);
  return dateFormat(new Date(value), 'yyyy-mm-dd');
}

export const timeFormatter = accessor => (cell, row) => {
  const value = getValue(row, accessor);
  return dateFormat(new Date(value), 'hh:MM:ss TT');
}

export const textFormatter = accessor => (cell, row) => {
  const value = getValue(row, accessor);
  return value;
}

export const linkFormatter = (accessor, linkType) => (cell, row) => {
  const value = getValue(row, accessor);

  switch (linkType) {
    case 'user':
      return `<a href="https://twitter.com/${value}" target="_blank">@${value}</a>`;
    case 'tweet':
      return `<a href="https://twitter.com/${row.user.screen_name}/status/${row.id_str}" target="_blank">${value}</a>`;
    default:
      return value;
  }
}
