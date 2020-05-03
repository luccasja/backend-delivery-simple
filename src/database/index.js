const Sequelize = require ('sequelize')
const dbConfig = require ('../config/database')

const Usuario = require ('../models/Usuario')
const Produto = require ('../models/Produto')
const Pedido = require ('../models/Pedido')
const Item = require ('../models/Item')

const connection = new Sequelize(dbConfig);

Usuario.init(connection)
Produto.init(connection)
Pedido.init(connection)
Item.init(connection)

Produto.associate(connection.models)
Pedido.associate(connection.models)
Item.associate(connection.models)

module.exports = connection;
