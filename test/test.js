const path = require('path')
const test = require('tape')
const s3scanner = require('../')

test('scan [filepath]', t => {
  t.plan(1)

  s3scanner({
    filepath: path.resolve(__dirname, './sites.txt')
  })

  t.ok(true)
})

test('scan [list]', t => {
  t.plan(1)

  s3scanner({
    sites: [
      'flaws.cloud',
      'http://flaws.cloud/',
      'reddit.com',
      'stackoverflow.com',
    ]
  })

  t.ok(true)
})

