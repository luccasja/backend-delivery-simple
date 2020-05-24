'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'pedidos',
      'cpf',
      {
        type: Sequelize.STRING(11),
        allowNull: false,
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
