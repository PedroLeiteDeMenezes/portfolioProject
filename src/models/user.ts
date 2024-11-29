import { Model, DataTypes, Sequelize } from 'sequelize';
import { IUser } from '../interface/IUser';
import bcryptjs from 'bcryptjs'
import { IUserPermissions } from '../interface/IPermissions';

class User extends Model<IUser> implements IUser{
  public id!: number | undefined;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password_hash!: string;
  public password?: string | undefined;
  public permissions!: IUserPermissions;


  static initialize (sequelize: Sequelize){
    User.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
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
          unique: true,
        },
        password_hash: {
          type: DataTypes.STRING(255),
        },
        password: {
          type: DataTypes.VIRTUAL,
          validate: {
            len: [6, 50]
          },
        },
        permissions:{
          type: DataTypes.JSON,
          allowNull: false,
          defaultValue:{
            general: {canDeleteUsers: false, canEditUsers: false},
            self:{canDeleteOwnAccount: true, canEditOwnAccount: true}
          },
          get(){
            const rawValue = this.getDataValue('permissions')
            return typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue
          },
          set(value : IUserPermissions){
            this.setDataValue('permissions', value)
          }
        }
      },
      {
        sequelize,
        tableName: 'users'
      }
    );
    this.addHook('beforeSave', async (user: User) => {
      if(user.password){
        user.password_hash = await bcryptjs.hash(user.password, 10)
      }
    })
    return this
  }

  passwordIsValid(password : string): Promise<boolean>{
    return bcryptjs.compare(password, this.password_hash)
  }
}

export default User