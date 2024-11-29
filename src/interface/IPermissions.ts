export interface IUserPermissions{
  general: {
    canDeleteUsers: boolean;
    canEditUsers: boolean
  };
  self:{
    canDeleteOwnAccount: boolean;
    canEditOwnAccount: boolean;
  }
}