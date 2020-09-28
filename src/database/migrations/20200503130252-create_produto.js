'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('produtos', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_categoria:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{model: 'categorias', key: 'id'},
        onUpdate: 'NO ACTION',
        onDelete: 'RESTRICT'
      },
      nome:{
        type: Sequelize.STRING,
        allowNull: false
      },
      descricao:{
        type: Sequelize.STRING(150),
        allowNull: false
      },
      valor_unitario:{
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      dir_img:{
        type: Sequelize.STRING,
        allowNull: true
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
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('produtos');
  }
};
