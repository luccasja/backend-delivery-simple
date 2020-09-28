'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try{
            await queryInterface.createTable('categorias', { 
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
            await queryInterface.bulkInsert('categorias', [{
                descricao: 'Diversos',
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
        return queryInterface.dropTable('categorias');
    }
};