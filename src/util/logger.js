const winston = require('winston')

// Trata o erro para carregar no Console
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
})

module.exports = logger
