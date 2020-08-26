const Licenciada = require('../models/Licenciada');
const {Op} = require('sequelize')
const path = require('path')
const fs = require('fs')


module.exports = {

    async read(request, response){
        const {key} = request.params
        /*
        if(key !== process.env.KEY){
            response.status(403).send('Acesso restrito!')
            return
        }
        */
        const res = await Licenciada.findAll()
        response.json(res)
    },

    async insert(request, response){
        const {filename} = request.file
        const {key} = request.params
        /*
        if(key !== process.env.KEY){
            response.status(403).send('Acesso restrito!')
            return
        }
        */
        const {
            nome_fantasia,
            doc,
            contato,
            endereco,
            numero,
            bairro,
            cep,
            complemento,
            msg_saudacao,
            msg_agradecimento,
        } = JSON.parse(request.body.body)

        const hasLicenciada = await Licenciada.findAll({
            where:{
                doc:{
                    [Op.eq]:doc
                }
            }
        })

        if(hasLicenciada > 0){
            response.status(400).send("Licenciada de documento:"+doc+" já existe")
            return
        }

        const res = await Licenciada.create({
            nome_fantasia,
            doc,
            contato,
            endereco,
            numero,
            bairro,
            cep,
            complemento,
            msg_saudacao,
            msg_agradecimento,
            logo: filename
        })

        if(res){
            response.status(200).send({ok:res.id})
            return
        }

        const path_file = path.resolve(__dirname, '..', '..', 'public', 'img', filename)
        fs.unlink(path_file, (err) => {
            if (err) {
                console.error(err)
            }else{
                console.log("arquivo "+filename+" removido")
            }
        })
        response.status(400).send({error: "Erro ao gravar Licenciada"})
    },

    async update(request, response){
        const {id, key} = request.params
        const {
            nome_fantasia,
            doc,
            contato,
            endereco,
            numero,
            bairro,
            cep,
            complemento,
            msg_saudacao,
            msg_agradecimento,
            msg_loja_fechada,
            logo
        } = JSON.parse(request.body.body)
        
        const consulta = await Licenciada.findByPk(id)

        let res
        let name_logo 

        if(request.file !== undefined){
            name_logo = request.file.filename
            await Licenciada.update(
                {
                    nome_fantasia,
                    doc,
                    contato,
                    endereco,
                    numero,
                    bairro,
                    cep,
                    complemento,
                    msg_saudacao,
                    msg_agradecimento,
                    msg_loja_fechada,
                    logo: request.file.filename
                },
                {where:{id}
            }).then((result)=>{
                res = result
            })
        }else{
            name_logo = logo
            await Licenciada.update(
                {
                    nome_fantasia,
                    doc,
                    contato,
                    endereco,
                    numero,
                    bairro,
                    cep,
                    complemento,
                    msg_saudacao,
                    msg_agradecimento,
                    msg_loja_fechada,
                    logo
                },
                {where:{id}
            }).then((result)=>{
                res = result
            })
        }

        

        if(res > 0){
            if(consulta !== null){
                if(consulta.logo !== name_logo){
                    const path_file = path.resolve(__dirname, '..', '..', 'public', 'img', consulta.logo)
                    fs.unlink(path_file, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        console.log("arquivo "+consulta.logo+" removido")
                    })
                }
            }
            response.status(200).send({result: "Licenciada de Id:"+id+" foi atualizado com sucesso!"})
            return
        }

        const path_file = path.resolve(__dirname, '..', '..', 'public', 'img', filename)
        fs.unlink(path_file, (err) => {
            if (err) {
                console.error(err)
            }else{
                console.log("arquivo "+filename+" removido")
            }
        })
        response.status(400).send({erro: "Erro ao atualizar Licenciada"})
    },

}