const liSDK = require('@livingdocs/node-sdk')

const conf = require('../../conf')
const liClient = new liSDK.Client(conf.get('client'))

module.exports = liClient
