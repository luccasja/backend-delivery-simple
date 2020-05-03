const {Model, DataTypes} = require('sequelize')

class Pedido extends Model{
    static init(connection){
        super.init({
            nome_cliente: DataTypes.STRING,
            telefone: DataTypes.STRING,
            endereco_entrega: DataTypes.STRING,
            numero_entrega: DataTypes.STRING,
            bairro_entrega: DataTypes.STRING,
            complemento_entrega: DataTypes.STRING,
            frm_pagamento: DataTypes.STRING,
            troco: DataTypes.DOUBLE,
            valor_total: DataTypes.DOUBLE,
            qntd_item: DataTypes.INTEGER,
            dt_finalizacao: DataTypes.DATE,
            entregue: DataTypes.BLOB,
        },{
            sequelize: connection
        })
    }

    static associate(models){
        this.hasMany(models.Item, {foreignKey: 'id_pedido', as: 'itens'})
    }
}

module.exports = Pedido