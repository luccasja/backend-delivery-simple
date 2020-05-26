const Pedido = require('../models/Pedido');
const { Op } = require("sequelize");

module.exports={
    async read(request, response){
        const {key} = request.params
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }
        const pedido = await Pedido.findAll()
        if(pedido){
            response.status(200).send(pedido)
            return
        }
        response.status(400).send({error:"Erro ao ler Pedidos"})
    },

    async readByPk(request, response){
        const {id, key} = request.params
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }
        const pedido = await Pedido.findByPk(id)
        if(pedido !== null){
            response.status(200).send(pedido)
            return
        }
        response.status(200).send([])
    },

    async readByDate(request, response){
        const {data_ini, data_fim, key} = request.params
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }
        const pedidos = await Pedido.findAll({
            where:{created_at:{[Op.gte]:data_ini,[Op.lte]:data_fim}}, 
            order:[['id','DESC']]
        })
        if(pedidos !== null){
            response.status(200).send(pedidos)
            return
        }
        response.status(200).send([])
    },

    async readByDateAll(request, response){
        const {data, key} = request.params
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }
        const pedidos = await Pedido.findAll({where:{created_at:{[Op.gte]:data}}})
        if(pedidos){
            response.status(200).send(pedidos)
            return
        }
        response.status(400).send({error:"Erro ao ler Pedidos"})
    },

    async insert(request, response){
        const {key} = request.params
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }
        const {
            nome_cliente, 
            cpf, 
            telefone,
            tipo_entrega, 
            endereco_entrega,
            numero_entrega, 
            bairro_entrega, 
            complemento_entrega,
            frm_pagamento,
            troco,
            frete,
            valor_total,
            dt_pedido,
            qntd_item,
            entregue,
            recebido
        } = request.body
        const pedido = await Pedido.create({
            nome_cliente, 
            cpf, 
            telefone,
            tipo_entrega, 
            endereco_entrega,
            numero_entrega, 
            bairro_entrega, 
            complemento_entrega,
            frm_pagamento,
            troco,
            frete,
            valor_total,
            dt_pedido,
            qntd_item,
            entregue,
            recebido
        })
        if(pedido){
            response.status(200).send({id:pedido.id})
            return
        }
        response.status(400).send({error:"Erro ao inserir o pedido"})
    },

    async update(request, response){
        const {id, key} = request.params
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }
        const {
            nome_cliente, 
            cpf, 
            telefone,
            tipo_entrega, 
            endereco_entrega,
            numero_entrega, 
            bairro_entrega, 
            complemento_entrega,
            frm_pagamento,
            troco,
            frete,
            valor_total,
            created_at,
            recebido,
            entregue,
            dt_finalizacao,
        } = request.body
        const pedido = await Pedido.update({
            nome_cliente, 
            cpf, 
            telefone,
            tipo_entrega, 
            endereco_entrega,
            numero_entrega, 
            bairro_entrega, 
            complemento_entrega,
            frm_pagamento,
            troco,
            frete,
            valor_total,
            created_at,
            recebido,
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
        const {id, key} = request.params
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }
        const pedido = await Pedido.destroy({where:{id}})
        if(pedido > 0){
            response.status(200).send({OK:true})
            return
        }
        response.status(400).send({error:"Erro ao deletar pedido"})
    },


    async registrarPedido(request, response){
        const {id, key} = request.params
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }
        const pedido = await Pedido.update({entregue:1, dt_finalizacao:(new Date())},{where:{id}})
        if(pedido > 0){
            response.status(200).send({Ok:true})
            return
        }
        response.status(200).send({Ok:false})
    },

    async receberPedido(request, response){
        const {id, key} = request.params
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }
        const pedido = await Pedido.update({recebido:1, dt_finalizacao:(new Date())},{where:{id}})
        if(pedido > 0){
            response.status(200).send({Ok:true})
            return
        }
        response.status(200).send({Ok:false})
    },

    async reabrir(request, response){
        const {id, key} = request.params
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }
        const pedido = await Pedido.update({entregue:0, dt_finalizacao:''},{where:{id}})
        if(pedido > 0){
            response.status(200).send({Ok:true})
            return
        }
        response.status(200).send({Ok:false})
    }
}