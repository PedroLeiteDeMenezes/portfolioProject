import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  up: async  (queryInterface: QueryInterface) => {
    await queryInterface.createTable('order_products', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      orderId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model: 'orders',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      productId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
          model: 'products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      price:{
        type: DataTypes.DECIMAL,
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
    await queryInterface.dropTable('order_products');
  }
};
