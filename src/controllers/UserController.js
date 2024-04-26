const UserService = require('../services/UserService')
const { Request, Response } = require('express')
const { errorHandler, errorResponse } = require('../util/error')
const { hash } = require('bcryptjs')

/**
 * 
 * @param {Request<{}, {}, import('../db/models/User').UserCreate>} req 
 * @param {Response} res 
 */
const create = async (req, res) => {
    const body = req.body
    console.log(body)
    try {

        // Validações
        if (!body.name) throw errorHandler(500, 'Nome não informado!')
        if (!body.email) throw errorHandler(500, 'Email não informado!')
        if (!body.password) throw errorHandler(500, 'Senha não informada!')
        // console.log("Dados Validados!");

        // Envia os dados ao service para criar o novo usuário
        const user = await UserService.create(body)
        if (user instanceof Error) throw errorHandler(500, user.message)

        res.status(200).json(user)
    } catch (err) {
        // Retorna o erro no console
        errorResponse(err, res)
    }
}


/**
 * 
 * @param {Request<{}, {}, {id: number}>} req 
 * @param {Response} res 
 */
const findAll = async (req, res) => {

    // Envia o ID para realizar a busca dos usuários cadastrados no sistema
    const user = await UserService.getAll(req.query.id)
    res.status(200).json(user)
}

/**
 * 
 * @param {Request<{},{}, import('../db/models/User').UserAttributes>} req 
 * @param {Response} res 
*/
const edit = async (req, res) => {
    const body = req.body
    try {

        // Validações
        if (!body.id) throw errorHandler(500, 'Id não informado!')

        // Caso o usuário troque a senha, cria um novo hash
        if (body.password) {
            body.password = await hash(body.password, 10)
        }

        // Envia os dados novos ao service para atualizar 
        const user = await UserService.edit(body)
        if (user instanceof Error) throw { error: 'Erro!' }

        res.status(200).json(user)
    } catch (err) {
        errorResponse(err, res)
    }
}

/**
 * 
 * @param {Request<{}, {}, {id: number}>} req 
 * @param {Response} res 
 */
const _delete = async (req, res) => {

    // Envia o ID do usuário para o service realizar a exclusão
    const user = await UserService._delete(req.query.id)
    res.status(200).json(user ? "Usuário Deletado!" : "Erro ao deletar usuário!")
}

/**
 * 
 * @param {Request<{},{}, import('../db/models/User').UserCreate>} req 
 * @param {Response} res 
*/
const login = async (req, res) => {
    const body = req.body
    try {

        // Validações
        if (!body.email) throw errorHandler(500, 'Email não informado!')
        if (!body.password) throw errorHandler(500, 'Senha não informada!')

        // Envia os dados ao service para fazer o login
        const user = await UserService.login(body)
        if (user instanceof Error) throw errorResponse(500, user.message)

        res.status(200).json(user)

    } catch (err) {
        errorResponse(err, res)
    }
}

module.exports = { create, findAll, edit, _delete, login }
