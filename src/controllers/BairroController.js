const Bairro = require('../models/Bairro')
const {Op} = require('sequelize')

module.exports = {
    async readAtivo(request, response){
        const {key} = request.params
        
        const res = await Bairro.findAll({where:{ativo:1}})
        if(res.length > 0){
            return response.status(200).json(res)
        }
        return response.status(200).json([])
    },

    async readAll(request, response){
        const {key} = request.params
        
        const res = await Bairro.findAll()
        if(res.length > 0){
            return response.status(200).json(res)
        }
        return response.status(200).json([])
    },

    async readAllName(request, response){
        const {key, nome} = request.params
        
        let query = `%${nome}%`
        const res = await Bairro.findAll({
            where:{descricao:{[Op.like]:query}}
        })
        if(res.length > 0){
            return response.status(200).json(res)
        }
        return response.status(200).json([])
    },

    async insert(request, response){
        const {key} = request.params
        const {descricao, frete, ativo} = request.body
        
        const res = await Bairro.create({descricao, frete, ativo})
        if(res !== null){
            return response.status(200).json({ok:res.id})
        }
        return response.status(400).json([])
    },

    async update(request, response){
        const {key, id} = request.params
        const {descricao, frete, ativo} = request.body

        const res = await Bairro.update({descricao, frete, ativo},{where:{id}})
        if(res > 0){
            return response.status(200).json(true)
        }
        return response.status(400).json(false)
    },

    async destroy(request, response){
        const {key, id} = request.params
        
        const res = await Bairro.destroy({where:{id}})
        if(res > 0){
            return response.status(200).json(true)
        }
        return response.status(400).json(false)
    }

}