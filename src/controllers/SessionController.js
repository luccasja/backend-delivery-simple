const Session = require('../models/Session')
const {Op} = require('sequelize')

module.exports = {
    async read(request, response){
        const res = await Session.findAll({where:{ativa:1}})
        if(res.length > 0){
            return response.status(200).json(true)
        }
        return response.status(200).json(false)
    },

    async insert(request, response){
        const {situacao} = request.params
        const hasExist = await Session.findAll({where:{ativa:{[Op.eq]:situacao}}})
        if(hasExist > 0){
            return response.status(200).json(true)
        }
        
        const res = await Session.create({ativa:situacao})
        if(res !== null){
            return response.status(200).json(true)
        }
        return response.status(200).json(false)
    },

    async update(request, response){
        const {situacao} = request.params
        const res = await Session.update({ativa:situacao},{where:{id:{[Op.gt]:0}}})
        if(res > 0){
            return response.status(200).json(true)
        }
        return response.status(200).json(false)
    },

    async destroy(request, response){
        const res = await Session.destroy({where:{id:{[Op.gt]:0}}})
        if(res > 0){
            return response.status(200).json(true)
        }
        return response.status(200).json(false)
    }

}