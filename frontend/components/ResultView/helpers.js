export const getValue = (data, accessor) => {
  return accessor.reduce((acc, key) => acc[key], data);
};

export const sortArrayByIndexes = (data, sortIndexes) => {
  const sortedData = new Array(data.length)
  for (let i = 0; i < sortedData.length; i++) {
    sortedData[i] =  data[sortIndexes[i]]
  }
  return sortedData;
}
