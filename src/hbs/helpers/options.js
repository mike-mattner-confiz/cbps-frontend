const config = require('../../../config.json');

module.exports = function(src) {
  // Load config.yml
  const { aem } = config;
  let option = '';

  switch (src) {
    case 'host':
      option = aem.host;
      break;
    case 'path':
      option = aem.path;
      break;
    case 'commonStyles':
      option = aem.commonStyles;
      break;
    case 'propertyStyles':
      option = aem.propertyStyles;
      break;
  }

  // return full asset source
  return option
};