const { Menu } = require("../db/models/Menu")

/**
 * 
 * @param {import("../db/models/Menu").MenuCreate} product 
 */
const create = async (product) => {
    // Cria o produto do menu e inseri no DB
    return await Menu.create(product).catch((err) => { return Error(err) })
}

/**
 * 
 * @param {number} id 
 */
const getAll = async (id) => {
    
    // Caso tenha ID, busca o produto específico
    if(id) return await Menu.findByPk(id)

    // Caso não haja ID, busca todos os produtos cadastrados
    return await Menu.findAll({
        order: [['updatedAt', 'DESC']]
    })
}

/**
 * 
 * @param {import("../db/models/Menu").MenuAttributes} product 
 */
const edit = async (product) => {
    
    // Busca o produto pelo id e atualiza o que foi enviado
    return await Menu.findByPk(product.id).then(async (p) => {
        await p.update(product)
        await p.save()
        return p
    }).catch((err) => { return Error(err) })
}

/**
 * 
 * @param {number} id 
 */
const _delete = async (id) => {

    // Deleta o produto baseado no ID informado
    return await Menu.destroy({where: {id}}).catch((err) => { return Error(err) })
}

module.exports = { create, getAll, edit, _delete }