'use strict';
const { QueryTypes } = require('sequelize');

module.exports = {
    async up (queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try{
            await queryInterface.addColumn(
                'produtos',
                'fracionado',
                {
                    type: Sequelize.TINYINT,
                    allowNull: true,
                },
                {transaction}
            );
            await queryInterface.sequelize.query(
                "UPDATE produtos SET fracionado = 0 WHERE id > 0", 
                {type:QueryTypes.UPDATE}, 
                {transaction}
            )
            await transaction.commit();

        }catch(err){
            await transaction.rollback();
            throw err;
        }
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'produtos',
            'fracionado'
        );
    }
};
