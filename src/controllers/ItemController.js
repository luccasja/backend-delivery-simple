const Item = require('../models/Item')
const Pedido = require('../models/Pedido')

module.exports = {
    async read(request, response){
        const {key} = request.params
        if(key !== process.env.KEY){
            response.status(403).send('Acesso restrito!')
            return
        }
        const item = await Item.findAll()
        if(item){
            response.status(200).send({item})
            return
        }
        response.status(400).send({error:"Erro ao ler itens"})
    },

    async readByPedido(request, response){
        const {id, key} = request.params
        if(key !== process.env.KEY){
            response.status(403).send('Acesso restrito!')
            return
        }
        const item = await Item.findAll({
            where:{id_pedido:id},
            include:[{association:'produto'}]
        })
        if(item){
            response.status(200).send(item)
            return
        }
        response.status(400).send({error:"Erro ao ler itens"})
    },

    async insert(request, response){
        const {id, key} = request.params
        if(key !== process.env.KEY){
            response.status(403).send('Acesso restrito!')
            return
        }
        const itens = request.body
        let flag
        try {
            itens.forEach(async item => {
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
        const {id, key} = request.params
        if(key !== process.env.KEY){
            response.status(403).send('Acesso restrito!')
            return
        }
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
        const {id, key} = request.params
        if(key !== process.env.KEY){
            response.status(403).send('Acesso restrito!')
            return
        }
        const item = await Item.destroy({where:{id_pedido:id}})
        if(item > 0){
            response.status(200).send({OK:true})
            return
        }
        response.status(400).send({error:"Erro ao deletar itens"})
    },
}