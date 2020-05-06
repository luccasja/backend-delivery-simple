const Pedido = require('../models/Pedido');
const { Op } = require("sequelize");

module.exports={
    async read(request, response){
        const pedido = await Pedido.findAll()

        if(pedido){
            response.status(200).send(pedido)
            return
        }

        response.status(400).send({error:"Erro ao ler Pedidos"})
    },

    async readByDate(request, response){
        const {data} = request.params
        //2020-05-03T00:00:00.0Z
        const pedidos = await Pedido.findAll({where:{created_at:{[Op.gte]:data}}})

        if(pedidos){
            response.status(200).send(pedidos)
            return
        }

        response.status(400).send({error:"Erro ao ler Pedidos"})

    },

    async readByDateAll(request, response){
        const {data} = request.params
        //2020-05-03T00:00:00.0Z
        const pedidos = await Pedido.findAll({where:{created_at:{[Op.gte]:data}}})

        if(pedidos){
            response.status(200).send(pedidos)
            return
        }

        response.status(400).send({error:"Erro ao ler Pedidos"})

    },

    async insert(request, response){
        console.log(request.body)
        const {
            nome_cliente, 
            telefone, 
            endereco_entrega,
            numero_entrega, 
            bairro_entrega, 
            complemento_entrega,
            frm_pagamento,
            troco,
            valor_total,
            dt_pedido,
            qntd_item,
            entregue
        } = request.body
        const pedido = await Pedido.create({
            nome_cliente, 
            telefone, 
            endereco_entrega,
            numero_entrega, 
            bairro_entrega, 
            complemento_entrega,
            frm_pagamento,
            troco,
            valor_total,
            dt_pedido,
            qntd_item,
            entregue
        })


        if(pedido){
            response.status(200).send({id:pedido.id})
            return
        }

        response.status(400).send({error:"Erro ao inserir o pedido"})
    },

    async update(request, response){
        const {id} = request.params
        const {
            nome_cliente, 
            telefone, 
            endereco_entrega,
            numero_entrega, 
            bairro_entrega, 
            complemento_entrega,
            frm_pagamento,
            troco,
            valor_total,
            created_at,
            entregue,
            dt_finalizacao,
        } = request.body
        const pedido = await Pedido.update({
            nome_cliente, 
            telefone, 
            endereco_entrega,
            numero_entrega, 
            bairro_entrega, 
            complemento_entrega,
            frm_pagamento,
            troco,
            valor_total,
            created_at,
            entregue,
            dt_finalizacao
        },{where:{id}})


        if(pedido > 0){
            response.status(200).send({id:id})
            return
        }

        response.status(400).send({error:"Erro ao atualizar o pedido"})
    },

    async delete(request, response){
        const {id} = request.params
        const pedido = await Pedido.destroy({where:{id}})

        if(pedido > 0){
            response.status(200).send({OK:true})
            return
        }

        response.status(400).send({error:"Erro ao deletar pedido"})
    },
}