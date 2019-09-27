module.exports = (array = [], keyValue, keyTitle) =>
  array.map(item => ({
    value: item[keyValue],
    title: item[keyTitle],
  }));
