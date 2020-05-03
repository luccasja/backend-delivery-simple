const Usuario = require('../models/Usuario');

module.exports = {

    async read(request, response){
        const res = await Usuario.findAll()
        response.json(res)
    },

    async insert(request, response){
        console.log(request.body)
        const {nome, user, pass} = request.body
        const res = await Usuario.create({nome, user, pass})

        if(res){
            response.status(200).send({id:res.id})
            return
        }
        response.status(400).send({erro: "Erro ao gravar usuario"})
    },

    async update(request, response){
        console.log(request.body)
        console.log(request.params)

        const {id} = request.params;
        const {nome, user, pass} = request.body

        let res 
        await Usuario.update(
            {nome, user, pass},
            {where:{id}
        }).then((result)=>{
            res = result
        })

        if(res > 0){
            response.status(200).send({result: "Usuario de Id:"+id+" foi atualizado com sucesso!"})
            return
        }

        response.status(400).send({erro: "Erro ao atualizar usuario"})
    },

    async delete(request, response){
        console.log(request.params)

        const {id} = request.params;

        let res = await Usuario.destroy({where:{id}})

        if(res > 0){
            response.status(200).send({result: "Usuario de Id:"+id+" foi deletado com sucesso!"})
            return
        }
        
        response.status(400).send({erro: "Erro ao deletar usuario"})
    },
}