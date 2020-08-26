const {Model, DataTypes} = require('sequelize')

class Parametro extends Model{
    static init(connection){
        super.init({
            nome: DataTypes.STRING,
            valor: DataTypes.STRING,
        },{
            sequelize: connection
        })
    }

}

module.exports = Parametro