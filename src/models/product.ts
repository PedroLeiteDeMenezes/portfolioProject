import { Model, DataTypes, Sequelize } from 'sequelize';
import { IProduct } from '../interface/IProduct';

class Product extends Model<IProduct> implements IProduct{
  public id?: number | undefined;
  public name!: string;
  public description!: string;
  public preco!: number;
  public image!: string;


  static initialize(sequelize: Sequelize){
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        name:{
          type: DataTypes.STRING,
          allowNull: false,
        },
        description:{
          type: DataTypes.STRING(20000),
          allowNull: false
        },
        preco:{
          type: DataTypes.DECIMAL,
          allowNull: false
        },
        image:{
          type: DataTypes.STRING,
          allowNull: false
        },
      },
      {
        sequelize,
        tableName: 'products'
      }
    )
  }
}

export default Product