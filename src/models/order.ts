import {Model, DataTypes, Sequelize} from 'sequelize'
import { IOrders } from '../interface/IOrders'
import {Models} from '../types/models'

class Order extends Model<IOrders> implements IOrders{
  public id?: number | undefined
  public userId: number | undefined
  public total_price!: number
  public status!: string

  static associate(models: Models): void{
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })
    this.hasMany(models.OrderProduct, {
      foreignKey: 'orderId',
      as: 'order_product'
    })
  }

  static initialize(sequelize: Sequelize){
    Order.init(
      {
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
      },
      {
        sequelize,
        tableName: 'orders',
      }
    )
  }
}

export default Order