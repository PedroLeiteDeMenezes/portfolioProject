import { Request, Response } from 'express';
import Order from '../models/order';
import OrderProduct from '../models/orderProducts';
import Product from '../models/product';
import validadeOrder from '../validations/order';

class OrderController{
  public static async post(req: Request, res:Response):Promise<any>{
    try{
      const {total_price, status, products} = req.body
      const userId = req.userId;
      if(userId === undefined || isNaN(userId)){
        return res.status(400).json({error: 'user id invalido'})
      }

      let totalPrice = 0
      for(let i = 0; i< products.length; i++){
        const product = await Product.findByPk(products[i].productId)
        if(product){
          totalPrice += product.preco * products[i].quantity
        }
      }

      if(!Array.isArray(products) || products.length === 0){
        return res.status(400).json({error: 'Lista de produtos invalida ou vazia'})
      }

      for (const product of products) {
        if (!product.productId || isNaN(Number(product.productId)) || !product.quantity || isNaN(Number(product.quantity))) {
          return res.status(400).json({ error: 'Produto ou quantidade inválida' });
        }
      }

      const validate = new validadeOrder()
      await validate.createOrder({total_price, status}, userId)

      const createOrder = await Order.create({
        userId: userId,
        total_price: totalPrice,
        status: String(status)
      })

      const orderProductsData = [];
      for (const product of products) {
        
        const foundProduct = await Product.findByPk(product.productId);
        if (!foundProduct) {
          return res.status(404).json({ error: `Produto com ID ${product.productId} não encontrado` });
        }

        const price = foundProduct.preco;
        const total = price * product.quantity;

        orderProductsData.push({
          orderId: createOrder.id as number,
          productId: product.productId,
          quantity: product.quantity,
          price,
          total,
        });
      }

      await OrderProduct.bulkCreate(orderProductsData);

      return res.status(201).json({ order: createOrder, products: orderProductsData });
    }catch(error: any){
      return res.status(400).json({error: error.message})
    }
  }

  
}

export default OrderController