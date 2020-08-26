const {Model, DataTypes} = require('sequelize')

class Bairro extends Model{
    static init(connection){
        super.init({
            descricao: DataTypes.STRING,
            frete: DataTypes.DOUBLE,
            ativo: DataTypes.TINYINT,
        },{
            sequelize: connection
        })
    }

}

module.exports = Bairro