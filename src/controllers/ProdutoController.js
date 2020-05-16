const Produto = require('../models/Produto');
const Item = require('../models/Item');

module.exports ={
    async read(request, response){

        const produto = await Produto.findAll()

        if(produto){
            response.status(200).send(produto)
            return
        }

        response.status(400).send({error:"Erro ao listar produto"})
    },

    async readAtivos(request, response){

        const produto = await Produto.findAll({where:{ativo:true}})

        if(produto){
            response.status(200).send(produto)
            return
        }

        response.status(400).send({error:"Erro ao listar produto"})
    },

    async insert(request, response){
        const {nome, descricao, valor_unitario, dir_name, ativo} = request.body;

        const produto = await Produto.create({nome, descricao, valor_unitario, dir_name, ativo})

        if(produto){
            response.status(200).send({Ok:produto.id})
            return
        }

        response.status(400).send({error:"Erro ao inserir produto"})
    },

    async update(request, response){
        const {id} = request.params
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
        const {id} = request.params
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