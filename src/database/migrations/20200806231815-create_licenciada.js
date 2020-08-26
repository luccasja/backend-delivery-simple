'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('licenciadas', { 
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			nome_fantasia:{
				type: Sequelize.STRING(50),
				allowNull: false
			},
			doc:{
				type: Sequelize.STRING(14),
				allowNull: false
			},
			contato:{
				type: Sequelize.STRING(11),
				allowNull: false
			},
			endereco:{
				type: Sequelize.STRING(80),
				allowNull: false
			},
			numero:{
				type: Sequelize.STRING(20),
				allowNull: false
			},
			bairro:{
				type: Sequelize.STRING(20),
				allowNull: false
			},
			cep:{
				type: Sequelize.STRING(9),
				allowNull: false
			},
			complemento:{
				type: Sequelize.STRING(80),
				allowNull: true
			},
			msg_saudacao:{
				type: Sequelize.STRING(160),
				allowNull: true
			},
			msg_agradecimento:{
				type: Sequelize.STRING(160),
				allowNull: true
			},
			logo:{
				type: Sequelize.STRING,
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
		return queryInterface.dropTable('licenciadas');
	}
};
