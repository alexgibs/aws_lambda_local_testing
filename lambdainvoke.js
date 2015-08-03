#!/usr/bin/env node

const path = require('path')
const awskeys = require('./aws-credentials.json')

process.env['LAMBDA_TASK_ROOT'] = path.join(__dirname, '..')
process.env['AWS_ACCESS_KEY_ID'] = awskeys.AWS_ACCESS_KEY_ID
process.env['AWS_SECRET_ACCESS_KEY'] = awskeys.AWS_SECRET_ACCESS_KEY

var index = require('./' + (process.argv[2] || 'index.js'))
  , handler = process.argv[3] || 'handler'
  , event = require('./event.json')
  , context = {
    done: function (err, data) {
      if (err) {
        console.log("Error! " + err)
        end()
      } else {
        console.log("Success! " + data)
        end()
      }
    }
    , succeed: function (data) {
      console.log("Success! " + data)
      end()
    }
    , fail: function (err) {
      console.log("Error! " + err)
      end()
    }
  }
  , start = process.hrtime()
  , end = function () {
    contextCalled = true
    console.log("--------------------------")
    console.log("Execution time: %dms", process.hrtime(start)[1] / 1000000)
    console.log("--------------------------")
    process.exit()
  }
  , contextCalled = false

function exit(options, error) {
  if (!contextCalled) {
    console.log("--------------------------")
    console.log('A context method was not called!')
    console.log("--------------------------")
  }
}

process.on('exit', exit)

index[handler](event, context)
