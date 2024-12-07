import { Request, Response } from 'express';
import Order from '../models/order';
import validadeOrder from '../validations/order';

class OrderController{
  public static async post(req: Request, res:Response):Promise<any>{
    try{
      const {total_price, status} = req.body
      const userId = req.userId;
      if(userId === undefined || isNaN(userId)){
        return res.status(400).json({error: 'user id invalido'})
      }
      const validate = new validadeOrder()
      await validate.createOrder({total_price, status}, userId)

      const createOrder = await Order.create({
        userId: userId,
        total_price: Number(total_price),
        status: String(status)
      })

      return res.status(400).json(createOrder)
    }catch(error: any){
      return res.status(400).json({error: error.message})
    }
  }
}

export default OrderController