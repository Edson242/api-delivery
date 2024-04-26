const {Sequelize} = require('sequelize')
const {development,production} = require('./config/config')


//models
const { User } = require('./models/User');
const { Menu } = require('./models/Menu');

// Carrega as variáveis de ambiente
const enviromentConfig = () =>{
    switch (process.env.NODE_ENV) {
        case 'production': return production;
        default: return development;
    }
}


// Configurações do Sequelize
const sequelize = new Sequelize(enviromentConfig())

// Inicia os Models carregados
User.initialize(sequelize)
Menu.initialize(sequelize)

// Inicia as associações criadas
User.associate(sequelize.models)
Menu.associate(sequelize.models)

// Exporta os Models devidamente inciados
module.exports = { 
    User,
    Menu,
    sequelize,
}