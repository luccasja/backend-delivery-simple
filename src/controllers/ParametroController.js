const Parametro = require('../models/Parametro');
const {Op} = require('sequelize')

module.exports = {

    async read(request, response){
        const {key} = request.params
        /*
        if(key !== process.env.KEY){
            response.status(403).send('Acesso restrito!')
            return
        }
        */
        const res = await Parametro.findAll()
        response.json(res)
    },

    async readByName(request, response){
        const {nome, key} = request.params
        /*
        if(key !== process.env.KEY){
            response.status(403).send('Acesso restrito!')
            return
        }
        */

        const res = await Parametro.findAll({
            where:{
                nome:{
                    [Op.eq]:nome
                }
            }
        })
        response.json(res)
    },

    async insert(request, response){
        const {key} = request.params
        /*
        if(key !== process.env.KEY){
            response.status(403).send('Acesso restrito!')
            return
        }
        */
        const {nome, valor} = request.body
        const hasParam = await Parametro.findAll({
            where:{
                nome:{
                    [Op.eq]:nome
                }
            }
        })

        if(hasParam > 0){
            response.status(400).send("Parametro "+nome+" já existe")
            return
        }

        const res = await Parametro.create({nome, valor})

        if(res){
            response.status(200).send({ok:res.id})
            return
        }
        response.status(400).send({error: "Erro ao gravar Parametro"})
    },

    async update(request, response){
        const {nome, key} = request.params;
        const {valor} = request.body

        /*
        if(key !== process.env.KEY){
            response.status(403).send('Acesso restrito!')
            return
        }
        */

        let res 
        await Parametro.update(
            {valor},
            {where:{nome}
        }).then((result)=>{
            res = result
        })

        if(res > 0){
            response.status(200).send({result: "Parametro de nome:"+nome+" foi atualizado com sucesso!"})
            return
        }

        response.status(400).send({erro: "Erro ao atualizar Parametro"})
    },

}