import {Model, DataTypes, Sequelize} from 'sequelize'
import { IOrdersProducts } from '../interface/IOrderProduct'
import { Models } from '../types/models'

class OrderProduct extends Model<IOrdersProducts> implements IOrdersProducts{
  public id?: number | undefined
  public orderId!: number
  public productId!: number
  public quantity!: number
  public price!: number

  static associate(models: Models): void{
    this.belongsTo(models.Order, {
      foreignKey: 'orderId',
      as: 'order'
    }),
    this.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product'
    })
  }

  static initialize(sequelize: Sequelize){
    OrderProduct.init(
      {
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
      },
      {
        sequelize,
        tableName: 'order_products'
      }
    )
  }
}

export default OrderProduct