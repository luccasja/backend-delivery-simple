const Item = require('../models/Item')

module.exports = {
    async read(request, response){
        const item = await Item.findAll()

        if(item){
            response.status(200).send({item})
            return
        }

        response.status(400).send({error:"Erro ao ler itens"})
    },

    async readByPedido(request, response){
        const {id} = request.params
        // params  :id 
        // body  {nome:"thyaguingo", }

        const item = await Item.findAll({where:{id_pedido:id}})

        if(item){
            response.status(200).send(item)
            return
        }

        response.status(400).send({error:"Erro ao ler itens"})
    },

    async insert(request, response){
        const {id} = request.params
        const itens = request.body

        console.log('id_peido: '+id)
        console.log(itens)

        let flag
        try {
            itens.forEach(async item => {
                /*
                switch (item) {
                    case id === null:
                        return response.status(400).send({error:"Id do Pedido não pode ser nulo!"})
                    case item.id_produto === null:
                        return response.status(400).send({error:"Id do Produto não pode ser nulo!"})
                    case item.valor_unitario === null:
                        return response.status(400).send({error:"Valor Unitário não pode ser nulo!"})
                    case item.valor_total === null:
                        return response.status(400).send({error:"Valor Total não pode ser nulo!"})
                    case item.quantidade === null:
                        return response.status(400).send({error:"Quantidade não pode ser nulo!"})
                    case item.posicao === null:
                        return response.status(400).send({error:"Posição não pode ser nulo!"})
                    default:
                        break;
                }
                */

                await Item.create({
                    id_produto: item.id_produto, 
                    id_pedido: id, 
                    valor_unitario: item.valor_unitario,
                    valor_total: item.valor_total, 
                    quantidade: item.quantidade, 
                    posicao: item.posicao,
                    observacoes: item.observacoes
                })
            });

            flag = true

        } catch (falha) {
            response.status(400).send({error:"Erro ao inserir o item "+falha})
            return
        }
        
        if(flag){
            response.status(200).send({Ok:flag})
            return
        }

        response.status(400).send({error:"Erro ao inserir o item"})
    },

    async update(request, response){
        const {id} = request.params
        const itens = request.body

        let item
        try {
            itens.forEach(async item => {
                await Item.update({
                    id_produto: item.id_produto, 
                    id_pedido: item.id_pedido, 
                    valor_unitario: item.valor_unitario,
                    valor_total: item.valor_total, 
                    quantidade: item.quantidade, 
                    posicao: item.posicao,
                    observacoes: item.observacoes
                },{where:{id_pedido:id}})
            });

            item = true

        } catch (falha) {
            response.status(400).send({error:"Erro ao atualizar os itens do pedido:"+id+" |"+falha})
            return
        }
        
        if(item){
            response.status(200).send({Ok:item})
            return
        }

        response.status(400).send({error:"Erro ao inserir o pedido"})
    },

    async delete(request, response){
        const {id} = request.params

        const item = await Item.destroy({where:{id_pedido:id}})

        if(item > 0){
            response.status(200).send({OK:true})
            return
        }

        response.status(400).send({error:"Erro ao deletar itens"})
    },
}