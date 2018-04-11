const liSDK = require('@livingdocs/sdk')

const conf = require('../../conf')
const liClient = new liSDK.Client(conf.get('client'))

module.exports = liClient
