import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async  (queryInterface: QueryInterface) => {
    await queryInterface.createTable('orders', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      total_price:{
        type: DataTypes.DECIMAL,
        allowNull: false
      },
      status:{
        type: DataTypes.STRING,
        allowNull: false
      },
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
    await queryInterface.dropTable('orders');
  }
};
