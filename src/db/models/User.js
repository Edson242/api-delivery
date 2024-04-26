// @ts-check
const { Model, DataTypes } = require("sequelize");

/**
 * @typedef {object} UserAttributes
 * @property {number} [id]
 * @property {string} name nome completo
 * @property {string} email email com @
 * @property {string} password senha (hash)
 * @property {string} [createdAt] 
 * @property {string} [updatedAt]
 */
/**
 * @typedef {Omit<UserAttributes, 'id'|'createdAt'|'updatedAt'>} UserCreate
 * @extends {Model<UserAttributes, UserCreate>}
 */
class User extends Model {
    static initialize(sequelize) {
        return this.init({
            name: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            password: {
                type: DataTypes.STRING
            }
        }, { sequelize, tableName: 'users' })
    }

    static associate(models) {

    }
}

module.exports = { User }