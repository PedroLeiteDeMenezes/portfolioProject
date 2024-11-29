import { IUserPermissions } from './IPermissions';

export interface IUser {
  id?: number;
  firstName: string
  lastName: string;
  email: string
  password_hash: string
  password?: string
  permissions: IUserPermissions
}