const express = require('express')
const cors = require('cors')

class AppController {
  constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  middlewares () {
    this.express.use(express.json())
    this.express.use(cors())
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: true }))
  }

  routes () {

    this.express.use(require('./routes'))

    this.express.use((req, res, next) => {
      if (req.url === '/') {
        res.redirect('/')
        return
      }
      next()
    })
  }

  
}

module.exports = new AppController().express