const qs = require('qs')
const path = require('path')
const fs = require('fs')
const unique = require('array-unique')
const isValidDomain = require('is-valid-domain')
const {exec}  = require('shelljs')
const urlparse = require('url-parse')

function scanner(opts) {
  opts = opts || {}
  let domains = []

  if (opts.filepath) {
    const filepath = path.resolve(opts.filepath)
    const lines = fs.readFileSync(filepath, 'utf-8').split(/\r?\n/)

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const str = line.replace(/"/gi, '')
      if (isValidDomain(str)) {
        domains.push(str)
        continue
      }

      const { hostname } = urlparse(str)
      if (hostname) {
        domains.push(hostname)
      }
    }
  }

  if (Array.isArray(opts.sites)) {
    const urls = opts.sites
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i]
      if (isValidDomain(url)) {
        domains.push(url)
        continue
      }

      const { hostname } = urlparse(url)
      if (hostname) {
        domains.push(hostname)
      }
    }
  }

  domains = unique(domains)
  for (let i = 0; i < domains.length; i++) {
    const domain = domains[i]
    const child = exec(`aws s3 ls --recursive s3://${domain}`, {silent:true})

    if (child.stdout) {
      console.log(domain)
      console.log(child.stdout)
    } else {
      console.log(`not public: ${domain}`)
    }
  }
}

module.exports = scanner
