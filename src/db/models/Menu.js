// @ts-check
const { Model, DataTypes } = require("sequelize");

/**
 * @typedef {object} MenuAttributes
 * @property {number} [id]
 * @property {string} description Descrição do produto
 * @property {number} price Preço do produto
 * @property {boolean} promocion Está em promoção
 * @property {string} [createdAt] 
 * @property {string} [updatedAt]
 */
/**
 * @typedef {Omit<MenuAttributes, 'id'|'createdAt'|'updatedAt'>} MenuCreate
 * @extends {Model<MenuAttributes, MenuCreate>}
 */
class Menu extends Model {
    static initialize(sequelize) {
        return this.init({
            description: {
                type: DataTypes.STRING
            },
            price: {
                type: DataTypes.FLOAT
            },
            promocion: {
                type: DataTypes.BOOLEAN
            }
        }, { sequelize, tableName: 'menu' })
    }

    static associate(models) {
        
    }
}

module.exports = { Menu }