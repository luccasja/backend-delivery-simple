const Sequelize = require ('sequelize')
const dbConfig = require ('../config/database')

const Usuario = require ('../models/Usuario')
const Produto = require ('../models/Produto')
const Pedido = require ('../models/Pedido')
const Item = require ('../models/Item')
const Session = require ('../models/Session')
const Parametro = require ('../models/Parametro')
const Licenciada = require ('../models/Licenciada')
const Bairro = require ('../models/Bairro')
const Categoria = require ('../models/Categoria')

const connection = new Sequelize(dbConfig);

Session.init(connection)
Usuario.init(connection)
Categoria.init(connection)
Produto.init(connection)
Pedido.init(connection)
Item.init(connection)
Parametro.init(connection)
Licenciada.init(connection)
Bairro.init(connection)

Produto.associate(connection.models)
Categoria.associate(connection.models)
Pedido.associate(connection.models)
Item.associate(connection.models)

module.exports = connection;
