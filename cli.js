#!/usr/bin/env node
'use strict'
const meow = require('meow')
const downloader = require('./src/index')

const cli = meow(`
  Usage
    $ miaopai-downloader http://www.miaopai.com/show/fEhYvm~vakOc22cw~n8rJg__.htm
`)

downloader(cli.input)
