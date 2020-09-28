const Categoria = require('../models/Categoria')
const {Op} = require('sequelize')

module.exports = {
    async readAtivo(request, response){
        const {key} = request.params
        
        const res = await Categoria.findAll({where:{ativo:1}})
        if(res.length > 0){
            return response.status(200).json(res)
        }
        return response.status(200).json([])
    },

    async readAll(request, response){
        const {key} = request.params
        
        const res = await Categoria.findAll()
        if(res.length > 0){
            return response.status(200).json(res)
        }
        return response.status(200).json([])
    },

    async readAllName(request, response){
        const {key, nome} = request.params
        
        let query = `%${nome}%`
        const res = await Categoria.findAll({
            where:{descricao:{[Op.like]:query}}
        })
        if(res.length > 0){
            return response.status(200).json(res)
        }
        return response.status(200).json([])
    },

    async insert(request, response){
        const {key} = request.params
        const {descricao, ativo} = request.body
        
        const res = await Categoria.create({descricao, ativo})
        if(res !== null){
            return response.status(200).json({ok:res.id})
        }
        return response.status(400).json([])
    },

    async update(request, response){
        const {key, id} = request.params
        const {descricao, ativo} = request.body

        const res = await Categoria.update({descricao, ativo},{where:{id}})
        if(res > 0){
            return response.status(200).json(true)
        }
        return response.status(400).json(false)
    },

    async destroy(request, response){
        const {key, id} = request.params
        
        const res = await Categoria.destroy({where:{id}})
        if(res > 0){
            return response.status(200).json(true)
        }
        return response.status(400).json(false)
    }

}