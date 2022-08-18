#!/usr/bin/env node

import proxy from 'http-proxy'
import { program } from 'commander'
import { parsePort } from './parse.js'
import { sslOptions } from './ssl.js'

program
  .name('sosolocal')
  .description('SSL proxy for local dev environments')
  .version('0.1.0', '-v, --version', 'output the version number')
  .requiredOption(
    '-s, --source <port>',
    'port to access service via https',
    parsePort
  )
  .requiredOption('-t, --target <port>', 'port of http service', parsePort)
  .option('-c, --cert <file>', 'path/to/your-ssl-cert.pem')
  .option('-k, --key <file>', 'path/to/your-ssl-key.pem')
  .option('-n, --host <hostname>', 'set the hostname', 'localhost')

program.parse()

const options = program.opts()

proxy
  .createServer({
    xfwd: true,
    ws: true,
    target: {
      host: options.host,
      port: options.target,
    },
    ssl: sslOptions(options),
  })
  .on('error', function (err) {
    console.error(err)
  })
  .listen(options.source)

console.log(
  `✅ Proxying https://${options.host}:${options.source} → http://${options.host}:${options.target}`
)
