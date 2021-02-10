/**************
 * Test module
                       _                            
  ___ _ __ _   _ _ __ | |_ ___   ___ ___  _ __ ___  
 / __| '__| | | | '_ \| __/ _ \ / __/ _ \| '_ ` _ \ 
| (__| |  | |_| | |_) | || (_) | (_| (_) | | | | | |
 \___|_|   \__, | .__/ \__\___(_)___\___/|_| |_| |_|
           |___/|_|                             


*****************/

// API module
const cryptoCom = require("node-crypto-com");

// market info
const marketData = require('./cryptocom-markets.json');

// common imports
const _ = require('lodash');
const Errors = require('../exchangeErrors');
const moment = require('moment');
const exchangeUtils = require('../exchangeUtils');

// shortcuts
const retry = exchangeUtils.retry;
const scientificToDecimal = exchangeUtils.scientificToDecimal;


// core
const Trader = function(config) {
    _.bindAll(this);

    console.log("config", config);

    // API key & secret
    // xxx why are they handled separatly?
    if(_.isObject(config)) {
        this.key = config.key;
        this.secret = config.secret;
        this.currency = config.currency.toUpperCase();
        this.asset = config.asset.toUpperCase();
    }

    // module definition
    this.name = 'CryptoCom';
    this.balance;
    this.price;
    this.asset = config.asset;
    this.currency = config.currency;
    this.pair = this.asset + this.currency;

    // xxx subscribe to the whole api here ?
    this.apihandler = new cryptoCom.CryptoApi(this.key, this.secret);


    this.apihandler.public.getInstruments()
    .then((response) => { 

        console.log(response.status);
        // console.log(response.data.result);
    });


    this.apihandler.private.getAccountSummary({ currency: cryptoCom.Currency.Cro })
    .then((response) => { 

        console.log(response);
    });



    // console.log(data.result);
    // console.log(status);


}

// xxx basic errors, would need a proper list for this API
const recoverableErrors = [
    'SOCKETTIMEDOUT',
    'ESOCKETTIMEDOUT',
    'TIMEDOUT',
    'CONNRESET',
    'CONNREFUSED',
    'NOTFOUND',
    '443',
    '504',
    '503',
    '502',
    'Empty response',
    'Nonce is too small'
  ];
  

// xxx not sure what are some keys there, copy.pasted from bitfinex.js
Trader.getCapabilities = function () {
    return {
        name: 'CryptoCom',
        slug: 'cryptocom',
        currencies: marketData.currencies,
        assets: marketData.assets,
        markets: marketData.markets,
        requires: ['key', 'secret'],
        tid: 'tid',
        providesFullHistory: true,
        providesHistory: 'date',
        tradable: true,
        forceReorderDelay: true,
        gekkoBroker: 0.6
    };
}


module.exports = Trader;