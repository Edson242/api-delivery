const express = require('express')
const routes = express.Router()

//Controllers
const UserController = require('./controllers/UserController')
const MenuController = require('./controllers/MenuController')

// Rota de Teste
routes.get('/', async (req, res) => {
  return res.json('API Delivery - Edson Silveira')
})

// End Point's

// ================== User Routes ==================
routes.post('/login', UserController.login)
routes.get('/user', UserController.findAll)
routes.post('/user', UserController.create)
routes.put('/user', UserController.edit)
routes.delete('/user', UserController._delete)

// ================== Menu Routes ==================
routes.get('/menu', MenuController.getAll)
routes.post('/menu', MenuController.create)
routes.put('/menu', MenuController.edit)
routes.delete('/menu', MenuController._delete)

module.exports = routes