import { Model, DataTypes, Sequelize, InstanceUpdateOptions, CreateOptions } from 'sequelize';
import { IOrdersProducts } from '../interface/IOrderProduct';
import { Models } from '../types/models';

class OrderProduct extends Model<IOrdersProducts, IOrdersProducts> implements IOrdersProducts {
  public id?: number;
  public orderId!: number;
  public productId!: number;
  public quantity!: number;
  public price!: number;
  public total!: number;

  static associate(models: Models): void {
    this.belongsTo(models.Order, {
      foreignKey: 'orderId',
      as: 'order',
    });
    this.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
    });
  }

  static initialize(sequelize: Sequelize) {
    OrderProduct.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        orderId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'orders',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        productId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'products',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
        },
        price: {
          type: DataTypes.DECIMAL,
          allowNull: false,
        },
        total: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: 'order_products',
      }
    );

    // Hook para calcular o total antes de salvar ou atualizar a instância
    OrderProduct.addHook('beforeSave', async (instance: OrderProduct, options: InstanceUpdateOptions<IOrdersProducts> | CreateOptions<IOrdersProducts>) => {
      // Garantir que a quantidade e o preço estejam disponíveis para o cálculo
      if (instance.quantity && instance.price) {
        instance.total = instance.quantity * instance.price;
      }
    });
  }
}

export default OrderProduct;
