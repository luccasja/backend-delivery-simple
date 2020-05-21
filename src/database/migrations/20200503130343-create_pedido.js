'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pedidos', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome_cliente:{
        type: Sequelize.STRING(255),
        allowNull: false
      }, 
      telefone:{
        type: Sequelize.STRING(14),
        allowNull: false
      },
      endereco_entrega:{
        type: Sequelize.STRING(255),
        allowNull: false
      },
      numero_entrega:{
        type: Sequelize.STRING,
        allowNull: false
      },
      bairro_entrega:{
        type: Sequelize.STRING(100),
        allowNull: false
      },
      complemento_entrega:{
        type: Sequelize.STRING(255),
        allowNull: true
      },
      frm_pagamento:{
        type: Sequelize.STRING,
        allowNull: false
      },
      troco:{
        type: Sequelize.DOUBLE,
        allowNull: true
      },
      frete:{
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      valor_total:{
        type: Sequelize.STRING,
        allowNull: false
      },
      qntd_item:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      dt_finalizacao:{
        type: Sequelize.DATE,
        allowNull: true
      },
      recebido:{
        type: Sequelize.TINYINT,
        allowNull: true
      },
      entregue:{
        type: Sequelize.TINYINT,
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
    return queryInterface.dropTable('pedidos');
  }
};
