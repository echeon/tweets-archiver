import dateFormat from 'dateformat';

export const getValue = (row, accessor) => {
    const accessorType = Object.prototype.toString.call(accessor);
    switch (accessorType) {
      case '[object Function]':
        return accessor(row);
      case '[object Array]':
        return getNestedValue(row, accessor);
      case '[object Number]':
      case '[object String]':
        return row[accessor];
      default:
        return null;
    };
};

export const getNestedValue = (data, paths) => {
  return paths.reduce((acc, path) => acc[path], data);
};

export const spaceship = (val1, val2) => {
  if ((val1 === null || val2 === null) || (typeof val1 != typeof val2)) {
    return null;
  }
  if (typeof val1 === 'string') {
    return (val1).localeCompare(val2);
  } else {
    if (val1 > val2) {
      return 1;
    } else if (val1 < val2) {
      return -1;
    }
    return 0;
  }
};

export const sortFunc = (accessor, sortType) => (a, b, order) => {
  let valueA, valueB;
  switch (sortType) {
    case 'date':
      valueA = dateFormat(new Date(getValue(a, accessor)), 'yyyy-mm-dd');
      valueB = dateFormat(new Date(getValue(b, accessor)), 'yyyy-mm-dd');
      break;
    case 'time':
      valueA = dateFormat(new Date(getValue(a, accessor)), 'HH:MM:ss');
      valueB = dateFormat(new Date(getValue(b, accessor)), 'HH:MM:ss');
      break;
    default:
      valueA = getValue(a, accessor);
      valueB = getValue(b, accessor);
      break;
  }
  return order === 'asc' ? spaceship(valueA, valueB) : spaceship(valueB, valueA);
}
