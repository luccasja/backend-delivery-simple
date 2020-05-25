'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'pedidos',
      'cpf',
      {
        type: Sequelize.STRING(14),
        allowNull: true,
        after: "nome_cliente"
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'pedidos',
      'cpf'
    );
  }
};
