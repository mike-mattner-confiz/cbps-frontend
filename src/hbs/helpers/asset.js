const path = require('path');
const moment = require('moment');
const queryString = require('query-string');
const config = require('../../../config.json');

module.exports = function(src, options) {
  // extensions that will have query strings
  const isImage = ['jpg','jpeg','png','png8']

  // Load config.yml
  const { aem } = config;

  // no need to continue if client doesn't use aem
  // or the root url is not set
  if (process.env.NODE_ENV !== 'production') {
    return src
  }

  // Query string options
  let hash = Object.assign({
    utc: moment.utc().format() // add cache killer
  }, options.hash)

  // start source as hostname sans trailing slash
  let source = aem.host.replace(/\/+$/, '')

  // extract format to determine
  let ext = hash.fmt ? hash.fmt.match(/\w+/)[0] : path.extname(src).replace('.', '').toLowerCase()

  // Detemine if asset is image
  if (isImage.find(x => x === ext)) {

    // required for query strings to work
    source += '/is/image'

    // If width & height or just height, add resMode
    if ((hash.wid && hash.hei) || (hash.hei && !hash.wid)) {
      hash.resMode = 'sharp2'
    }

    // Default to constraining fit. If the image doesn't fit in
    // the supplied wid/hei combination, having constrain enabled
    // will strip out whitespace from the image.
    if (hash.wid || hash.hei) {
      hash.fit = hash.fit || 'constrain'
    }

    // extract format from file extension and allow transparency for png files
    // this can be overridden by passing `alpha=false`
    hash.fmt = (/^png8?$/.test(ext)) ? ext += hash.alpha || '-alpha' : ext
  }

  // append aem path to source sans trailing slash
  // but prepend slash to source if it doesn't exist
  source += aem.path.replace(/\/+$/, '') + src.replace(/^\/?/, '/')

  // parse query string
  if (Object.keys(hash).length > 0) {
    source += '?' + queryString.stringify(hash, { strict: false, encode: false })
  }

  // return full asset source
  return source
};