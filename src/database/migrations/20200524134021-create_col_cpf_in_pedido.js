'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'pedidos',
      'cpf',
      {
        type: Sequelize.STRING(11),
        allowNull: false
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
