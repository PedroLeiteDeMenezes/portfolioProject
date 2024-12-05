export interface IUserPermissions{
  general: {
    canDeleteUsers: boolean;
    canEditUsers: boolean
    canEditProduct: boolean
  };
  self:{
    canDeleteOwnAccount: boolean;
    canEditOwnAccount: boolean;
  }
}