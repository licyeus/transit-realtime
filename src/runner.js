// this is a hack around pm2+babel limitations, see https://github.com/Unitech/pm2/issues/1643#issuecomment-144087967

require('babel-polyfill')
require('babel-register')
require('./cron.js')

