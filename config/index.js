const fs = require('fs');
const path = require('path');
const logger = require('./winston.js');
const config = require('./config.json');
const errorConversion = require('./errorToHttp');

const sslConfig = {
  key: fs.readFileSync(path.join(__dirname, 'key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
  // NOTE(clark): Should we et rid of this for production?
  passphrase: 'colemancs499',
};

module.exports = {
  logger,
  config,
  errorConversion,
  sslConfig,
};
