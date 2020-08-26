'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('sessions', { 
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        ativa:{
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
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('sessions');
    }
};
