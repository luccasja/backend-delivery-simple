'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('items', { 
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_produto:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{model: 'produtos', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      id_pedido:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{model: 'pedidos', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      valor_unitario:{
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      valor_total:{
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      quantidade:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      posicao:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      observacoes:{
        type: Sequelize.STRING(100),
        allowNull: true
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
    return queryInterface.dropTable('items');
  }
};
