const {Model, DataTypes} = require('sequelize')

class Produto extends Model{
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            descricao: DataTypes.STRING,
            valor_unitario: DataTypes.DOUBLE,
            dir_img: DataTypes.STRING,
        },{
            sequelize: connection
        })
    }

    static associate(models){
        this.hasMany(models.Item, {foreignKey: 'id_produto', as: 'produtos' })
    }
}

module.exports = Produto