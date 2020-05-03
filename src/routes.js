const express = require('express')
const routes = express.Router()
const connection = require('./database')
const UsuarioController = require('./controllers/UsuarioController')



routes.post('/usuario', UsuarioController.insert)
routes.get('/usuario', UsuarioController.read)
routes.put('/usuario/:id/update', UsuarioController.update)
routes.delete('/usuario/:id/delete', UsuarioController.delete)

routes.post('/produto', async(request, response)=>{
    const{nome, descricao, valor_unitario, dir_img} = request.body;
    await connection('produto').insert({
        nome,
        descricao,
        valor_unitario,
        dir_img
    })
    return response.json({nome})
})

routes.post('/pedido', async(request, response)=>{
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
        qntd_item,
        dt_pedido,
        dt_finalizacao
    } = request.body

    await connection('pedido').insert({
        nome_cliente,
        telefone,
        endereco_entrega,
        numero_entrega,
        bairro_entrega,
        complemento_entrega,
        frm_pagamento,
        troco,
        valor_total,
        qntd_item,
        dt_pedido,
        dt_finalizacao
    })

    return response.json(request.body)
})

routes.post('/itens', async(request, response)=>{
    //const {id_pedido} = request.params;
    const {itens} = request.body

    itens.forEach(async item => {
        await connection('pedido_item').insert({
            id_pedido: item.id_pedido,
            id_produto: item.id_produto,
            valor_unitario: item.valor_unitario,
            valor_total: item.valor_total,
            quantidade: item.quantidade,
            posicao: item.posicao,
            observacoes: item.observacao
        })
    });
    
    return response.json({itens})

})

module.exports = routes;