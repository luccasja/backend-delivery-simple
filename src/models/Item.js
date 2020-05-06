const {Model, DataTypes} = require('sequelize')

class Item extends Model{
    static init(connection){
        super.init({
            //id_produto: DataTypes.INTEGER,
            //id_pedido: DataTypes.INTEGER,
            valor_unitario: DataTypes.INTEGER,
            valor_total: DataTypes.DOUBLE,
            quantidade: DataTypes.INTEGER,
            observacoes: DataTypes.STRING,
        },{
            sequelize: connection
        })
    }

    static associate(models){
        this.belongsTo(models.Pedido, {foreignKey: 'id_pedido', as: 'pedido' })
        this.belongsTo(models.Produto, {foreignKey: 'id_produto', as: 'produto'})
    }
}

module.exports = Item