const Produto = require('../models/Produto');
const { Op } = require("sequelize");
const fs = require('fs')
const path = require('path')

module.exports ={
    
    async upload(request, response){
        console.log(request.file)
        const {id, key} = request.params
        const {filename} = request.file
        /*
        if(key !== process.env.KEY){
            response.status(403).send('Acesso restrito!')
            return
        }
        */
        const produto = await Produto.update(
            {dir_img: filename}, 
            {where:{id}
        })
        if(produto > 0){
            response.status(200).send({Ok:true})
            return
        }
        response.status(400).send({error:"Erro ao realizar upload da imagem"})
    },

    async update(request, response){
        console.log(request.file)
        const {id, key} = request.params
        const {filename} = request.file

        const consulta = await Produto.findByPk(id)

        if(consulta !== null){
            if(consulta.dir_img !== null){
                const path_file = path.resolve(__dirname, '..', '..', 'public', 'img', consulta.dir_img)
                fs.unlink(path_file, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                    console.log("arquivo removido")
                })
            }
        }
        /*
        if(key !== process.env.KEY){
            response.status(403).send('Acesso restrito!')
            return
        }
        */
        const produto = await Produto.update(
            {dir_img: filename}, 
            {where:{id}
        })

        if(produto > 0){
            response.status(200).send({Ok:true})
            return
        }
        response.status(400).send({error:"Erro ao realizar upload da imagem"})
    },
}