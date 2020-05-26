const Produto = require('../models/Produto');
const Item = require('../models/Item');
const { Op } = require("sequelize");

module.exports ={
    async read(request, response){
        const {key} = request.params
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }

        const produto = await Produto.findAll()
        if(produto){
            response.status(200).send(produto)
            return
        }
        response.status(400).send({error:"Erro ao listar produto"})
    },

    async readByPK(request, response){
        const {id, key} = request.params
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }
        const produto = await Produto.findByPk(id)
        if(produto){
            response.status(200).send(produto)
            return
        }
        response.status(200).send([])
    },

    async readByName(request, response){
        const {nome, key} = request.params
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }
        const query = '%'+nome+'%'
        const produto = await Produto.findAll({where:{nome:{[Op.like]:query}}})
        if(produto){
            response.status(200).send(produto)
            return
        }
        response.status(200).send([])
    },

    async readAtivos(request, response){
        const {situacao, key} = request.params
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }
        const produto = await Produto.findAll({where:{ativo:{[Op.eq]:situacao}}})
        if(produto){
            response.status(200).send(produto)
            return
        }
        response.status(400).send({error:"Erro ao listar produto"})
    },

    async insert(request, response){
        const {key} = request.params
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }
        const {nome, descricao, valor_unitario, dir_name, ativo} = request.body;
        const produto = await Produto.create({nome, descricao, valor_unitario, dir_name, ativo})
        if(produto){
            response.status(200).send({Ok:produto.id})
            return
        }
        response.status(400).send({error:"Erro ao inserir produto"})
    },

    async update(request, response){
        const {id, key} = request.params
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }
        const {nome, descricao, valor_unitario, dir_name, ativo} = request.body;
        const produto = await Produto.update(
            {nome, descricao, valor_unitario, dir_name, ativo}, 
            {where:{id}
        })
        if(produto > 0){
            response.status(200).send({Ok:true})
            return
        }
        response.status(400).send({error:"Erro ao atualizar produto"})
    },

    async delete(request, response){
        const {id, key} = request.params
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }
        const hasItensPedido = await Item.findAll({where:{id_produto:id}})
        if(hasItensPedido.length === 0){
            const produto = await Produto.destroy({where:{id}})
            if(produto > 0){
                response.status(200).send({Ok:true})
                return
            }
            response.status(400).send({error:"Erro ao deletar produto"})
            return
        }
        response.status(200).send({Ok:false})
    }
}