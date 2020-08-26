const {Model, DataTypes} = require('sequelize')

class Session extends Model{
    static init(connection){
        super.init({
            ativa: DataTypes.TINYINT,
        },{
            sequelize: connection
        })
    }

}

module.exports = Session