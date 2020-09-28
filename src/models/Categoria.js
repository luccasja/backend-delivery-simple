const {Model, DataTypes} = require('sequelize')

class Categoria extends Model{
    static init(connection){
        super.init({
            descricao: DataTypes.STRING,
            ativo: DataTypes.TINYINT,
        },{
            sequelize: connection,
            tableName: 'categorias'
        })
    }

    static associate(models){
        this.hasMany(models.Produto, {foreignKey: 'id_categoria', as: 'produtos' })
    }
}

module.exports = Categoria