import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async  (queryInterface: QueryInterface) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      permissions:{
        type: DataTypes.JSON, 
        allowNull: true,      
        defaultValue: {}   
      } ,     
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, 
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, 
      },
    });  
  },

  down: async (queryInterface:QueryInterface) =>  {
    await queryInterface.dropTable('users');
  }
};
