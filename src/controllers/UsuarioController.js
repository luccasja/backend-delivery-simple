const Usuario = require('../models/Usuario');
const {Op} = require('sequelize')

module.exports = {

    async auth(request, response){
        const {key} = request.params
        //process.env.KEY
        if(key !== 'ZmluYW1hc3Nh'){
            response.status(403).send('Acesso restrito!')
            return
        }
        const {user, pass} = request.body
        const result = await Usuario.findAll({
            where:{
                user:{
                    [Op.eq]:user
                },
                pass:{
                    [Op.eq]:pass
                }

            }
        })

        if(result.length > 0){
            response.status(200).send({autenticado: true})
            return
        }
        response.status(401).send("Usuario não autenticado")
        return
    },

    async read(request, response){
        const res = await Usuario.findAll()
        response.json(res)
    },

    async insert(request, response){
        console.log(request.body)
        const {nome, user, pass} = request.body
        const res = await Usuario.create({nome, user, pass})

        if(res){
            response.status(200).send({ok:res.id})
            return
        }
        response.status(400).send({error: "Erro ao gravar usuario"})
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