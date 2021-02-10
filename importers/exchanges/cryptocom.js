// crypto.com fetcher


// xxx tests
// xxx overwrite config with test-config

const util = require('../../core/util.js');
var testConfig = require('../../test/test-config.json');

testConfig.watch.key = '';
testConfig.watch.secret = '';
util.setConfig(testConfig);



/*
*
*   wow
*
*/

// base imports
const _ = require('lodash');
const moment = require('moment');
const log = require('../../core/log');


const dirs = util.dirs();
const config = util.getConfig();

// module
const Fetcher = require(dirs.exchanges + 'cryptocom');
// const retry = require(dirs.exchanges + '../exchangeUtils').retry;


// instance
var fetcher = new Fetcher(config.watch);


// console.log(fetcher);