const dotenv = require('dotenv')
const server = require('./app')

server.listen(process.env.PORT || 8080, () => {
    console.log(`App rodando na porta ${process.env.PORT || 8080}`);
})