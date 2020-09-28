const {Model, DataTypes} = require('sequelize')

class Produto extends Model{
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            descricao: DataTypes.STRING,
            valor_unitario: DataTypes.DOUBLE,
            ativo: DataTypes.TINYINT,
            dir_img: DataTypes.STRING,
            fracionado:DataTypes.TINYINT
        },{
            sequelize: connection
        })
    }

    static associate(models){
        this.hasMany(models.Item, {foreignKey: 'id_produto', as: 'produtos' })
        this.belongsTo(models.Categoria, {foreignKey: 'id_categoria', as: 'categoria' })
    }
}

module.exports = Produto