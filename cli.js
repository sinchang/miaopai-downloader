#!/usr/bin/env node
'use strict'
const meow = require('meow')
const downloader = require('./src/index')
const updateNotifier = require('update-notifier')
const pkg = require('./package.json')

updateNotifier({pkg}).notify()

const cli = meow(`
  Usage
    $ miaopai-downloader http://www.miaopai.com/show/fEhYvm~vakOc22cw~n8rJg__.htm
`)

downloader(cli.input)
