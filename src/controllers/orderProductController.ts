import { Request, Response } from 'express';
import validateOrderProducts from '../validations/orderProducts';
import OrderProduct from '../models/orderProducts';

class OrderProductController{
  public static async post(req:Request, res:Response):Promise<any>{
    try{
      const {quantity, price, total} = req.body
      const {productId, orderId} = req.params

      if (!productId || isNaN(Number(productId))) {
        return res.status(400).json({ error: 'Product ID inválido' });
      }
      if (!orderId || isNaN(Number(orderId))) {
        return res.status(400).json({ error: 'Order ID inválido' });
      }


      const validate = new validateOrderProducts()
      await validate.createOrderProduct({quantity, price}, Number(productId), Number(orderId))

      const createOrderProduct = await OrderProduct.create({
        productId: Number(productId),
        orderId: Number(orderId),
        price: Number(price),
        quantity: Number(quantity),
        total: Number(total)
      })

      return res.json(createOrderProduct)

    }catch(error: any){
      return res.status(400).json({error: error.message})
    }
  }
}

export default OrderProductController