export interface Models{
  User: typeof import('../models/user').default
  Order: typeof import('../models/order').default
  OrderProduct: typeof import('../models/orderProducts').default
  Product: typeof import('../models/product').default
}