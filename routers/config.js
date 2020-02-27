/**
 * @author UMU618 <umu618@hotmail.com>
 * @copyright MEET.ONE 2019
 * @description Use block-always-using-brace npm-coding-style.
 */

'use strict'

const conf = require('../conf')
const eos = require('../utils/eos')

const crypto = require("crypto")
const express = require('express')
const router = express.Router()
const fs = require('fs')

router.route(["/"])
  .get((req, res, next) => {
    if (req.session.secret === conf.secret
      || (req.query.secret
        && crypto.createHash("sha256").update(conf.secret).digest("hex")
          == req.query.secret)) {
      res.end(fs.readFileSync(conf.filePath, 'utf8'))
    } else {
      res.end('Not logged in yet!')
    }
  })
  .post((req, res, next) => {
    if (req.session.secret === conf.secret) {
      let content = []
      for (let line of req.body.content.split(/\n/)) {
        const ln = line.trim()
        const arr = ln.split(',')
        if (arr && arr.length == 2 && eos.isValidEosName(arr[0])
          && eos.isValidEosName(arr[1])) {
          content.push(ln)
        }
      }
      content.sort()
      fs.writeFileSync(conf.filePath, content.join('\n'), 'utf8')
    }
    res.redirect('/')
  })

module.exports = router
