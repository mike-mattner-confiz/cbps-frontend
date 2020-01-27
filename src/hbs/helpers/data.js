module.exports = function(source = 'data', options) {
  const data = require(`../../data/${source}.json`);
  return options.fn(data);
};