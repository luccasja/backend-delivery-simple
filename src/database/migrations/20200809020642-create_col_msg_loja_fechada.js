'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn(
            'licenciadas',
            'msg_loja_fechada',
            {
                type: Sequelize.STRING(160),
                allowNull: true,
                after: "msg_agradecimento"
            }
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'licenciadas',
            'msg_loja_fechada'
        );
    }
};
