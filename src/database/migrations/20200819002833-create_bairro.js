'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try{
            await queryInterface.createTable('bairros', { 
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                    allowNull: false,
                },
                descricao:{
                    type: Sequelize.STRING(100),
                    allowNull: false
                },
                frete:{
                    type: Sequelize.DOUBLE,
                    allowNull: false,
                },
                ativo:{
                    type: Sequelize.TINYINT,
                    allowNull: false
                },
                created_at:{
                    type: Sequelize.DATE,
                    allowNull: false
                },
                updated_at:{
                    type: Sequelize.DATE,
                    allowNull: false
                }
            }, {transaction});
            await queryInterface.bulkInsert('bairros', [{
                descricao: 'Outros',
                frete: 15,
                ativo: 1,
                created_at: new Date(),
                updated_at: new Date()
            }], {transaction});
            await transaction.commit();

        } catch (err) {
            await transaction.rollback();
            throw err;
        }
        
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('bairros');
    }
};
