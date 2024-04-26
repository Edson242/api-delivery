const logger = require('./logger')
module.exports = {

  // Recebe o Status Code e a Mensagem que será retornada
  errorHandler: (code, msg) => {
    const e = new Error(msg)
    e.code = code
    return e
  },

  // Trata o erro para retornar para para o usuário && console
  errorResponse: (e, res) => {
    logger.error(`${res.req.method} - ${res.req.url} - ${JSON.stringify(res.req.params)} - ${JSON.stringify(res.req.query)} - ${JSON.stringify(res.req.body)} - ${e.message}`)
    const status = parseInt(e.code) ? e.code : 500
    const msg = e.message ? e.message : (e.name ? e.name : 'Internal Error')
    return res.status(status).json({ msg })
  }
}
