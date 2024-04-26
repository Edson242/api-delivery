const { User } = require("../db/index")
const { hash, compare } = require('bcryptjs')

/**
 * 
 * @param {import("../db/models/User").UserCreate} user 
 */
const create = async (user) => {
    
    // Cria o hash da senha enviada do usuário
    user.password = await hash(user.password, 10)
    // console.log("Senha Gerada!");

    // Cria o usuário com o Model
    return await User.create(user).catch((err) => { return Error(err) })
}

/**
 * 
 * @param {number} id 
 */
const getAll = async (id) => {

    // Caso tenha ID, ele busca pelo ID do usuário
    if (id) return await User.findByPk(id)

    // Caso não haja ID, ele traz todos os usuários cadastrados
    return await User.findAll({
        order: [['createdAt', 'DESC']]
    })
}

/**
 * 
 * @param {import("../db/models/User").UserAttributes} user 
 */
const edit = async (user) => {

    // Faz a busca do usuário apatir do ID enviado
    return await User.findByPk(user.id).then(async (u) => {
        // Altera os dados enviados e salva
        await u.update(user)
        await u.save()
        return u
    }).catch((err) => { return Error(err) })
}

/**
 * 
 * @param {number} id 
 */
const _delete = async (id) => {

    // Deleta o usuário com o ID enviado
    return await User.destroy({ where: { id } }).catch((err) => { return Error(err) })
}

/**
 * 
 * @param {import("../db/models/User").UserCreate} user 
 */
const login = async (user) => {

    // Validações
    const senha = await User.findOne({
        where: {email: user.email},
        attributes: ['password']
    })
    
    // Verfica se a senha enviada está correta com o hash do banco
    return await compare(user.password, senha.dataValues.password) ? true : false
}

module.exports = { create, getAll, edit, _delete, login }