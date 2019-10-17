#!/usr/bin/env node

/**
 * @author UMU618 <umu618@hotmail.com>
 * @copyright MEET.ONE 2019
 * @description Use block-always-using-brace npm-coding-style.
 */

'use strict'

const conf = require('./conf')

const express = require('express')
const app = express()
const session = require('express-session')
app.use(session({
  secret: 'secret'
  , resave: true
  , saveUninitialized: false
  , cookie: {
    maxAge : 5 * 60 * 1000
  }
}))

// only if you're behind a reverse proxy
app.enable('trust proxy')

const compression = require('compression')
app.use(compression())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*')
  req.setEncoding('utf8')
  res.setHeader('X-Powered-By', 'MeetOne')

  next()
})

const path = require('path')
//app.use(express.static(path.join(__dirname, 'public')))

app.use('/', require('./routers/root'))
app.use('/login', require('./routers/login'))
app.use('/config', require('./routers/config'))

app.use('/*', function (req, res, next) {
  console.log('Unhandled:', req.originalUrl)
  next()
})

app.use(function(err, req, res, next) {
  res.status(500)
  res.end(JSON.stringify(err))
})

app.listen(conf.port)
