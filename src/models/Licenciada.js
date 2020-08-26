const {Model, DataTypes} = require('sequelize')

class Licenciada extends Model{
    static init(connection){
        super.init({
            nome_fantasia: DataTypes.STRING,
            doc: DataTypes.STRING,
            contato: DataTypes.STRING,
            endereco: DataTypes.STRING,
            numero: DataTypes.STRING,
            bairro: DataTypes.STRING,
            cep: DataTypes.STRING,
            complemento: DataTypes.STRING,
            msg_saudacao: DataTypes.STRING,
            msg_agradecimento: DataTypes.STRING,
            msg_loja_fechada: DataTypes.STRING,
            logo: DataTypes.STRING,
        },{
            sequelize: connection
        })
    }

}

module.exports = Licenciada