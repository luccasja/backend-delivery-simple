'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'pedidos',
      'tipo_entrega',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        after: "telefone"
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'pedidos',
      'tipo_entrega'
    );
  }
};