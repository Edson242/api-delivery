const { Request, Response } = require('express')
const { errorResponse, errorHandler } = require('../util/error')
const MenuService = require('../services/MenuService')

/**
 * 
 * @param {Request<{}, {}, import('../db/models/Menu').MenuCreate>} req 
 * @param {Response} res 
 */
const create = async (req, res) => {
    // Pega os dados enviado pelo body
    const body = req.body

    try {

        // Validações
        if (!body.description) throw errorHandler(500, 'Descrição não informada!')
        if (!body.price) throw errorHandler(500, 'Preço não informado!')


        // Envia os dados para o service salvar o produto
        const product = await MenuService.create(body)
        if (product instanceof Error) throw errorHandler(500, product.message)

        res.status(200).json(product)
    } catch (err) {
        errorResponse(err, res)
    }

}

/**
 * 
 * @param {Request<{}, {}, {}, {id: number}} req 
 * @param {Response} res 
*/
const getAll = async (req, res) => {

    try {

        const product = await MenuService.getAll(req.query.id)
        if (product instanceof Error) throw errorHandler(500, product.message)

        res.status(200).json(product)

    } catch (err) {
        errorResponse(err, res)
    }
}

/**
 * 
 * @param {Request<{}, {}, import('../db/models/Menu').MenuAttributes} req 
 * @param {Response} res 
*/
const edit = async (req, res) => {
    const body = req.body

    try {

        // Validações
        if (!body.id) throw errorHandler(500, 'ID não informado!')

        // Envia os dados para o service atualizar
        const product = await MenuService.edit(body)
        if (product instanceof Error) throw errorHandler(500, product.message)

        res.status(200).json(body)

    } catch (err) {
        errorResponse(err, res)
    }
}

/**
 * 
 * @param {Request<{}, {}, {}, {id: number}} req 
 * @param {Response} res 
*/
const _delete = async (req, res) => {
    const { id } = req.query

    try {

        const product = await MenuService._delete(id)
        if (product instanceof Error) throw errorHandler(500, product.message)

        res.status(200).json({ msg: 'Deletado com sucesso!' })

    } catch (err) {
        errorResponse(err, res)
    }
}

module.exports = { create, getAll, edit, _delete }