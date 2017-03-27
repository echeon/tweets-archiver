export const getValue = (data, accessor) => {
  return accessor.reduce((acc, key) => acc[key], data);
};

export const getNestedValue = (data, paths) => {
  return paths.reduce((acc, path) => acc[key], data);
}

export const sortArrayByIndexes = (data, sortIndexes) => {
  const sortedData = new Array(data.length)
  for (let i = 0; i < sortedData.length; i++) {
    sortedData[i] =  data[sortIndexes[i]]
  }
  return sortedData;
}

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
}
