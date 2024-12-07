export interface Models{
  User: typeof import('../models/user').default
  Order: typeof import('../models/order').default
}