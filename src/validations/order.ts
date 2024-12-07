import { Request, Response } from 'express';
import Order from '../models/order';
import User from '../models/user';

export default class validadeOrder{
  async createOrder(data:any, userId: number):Promise<any>{
    const userExists = await User.findOne({where: {id: userId}})

    if(!userExists){
      throw new Error('Usuario com esse id não existe no nosso banco de dados portanto não é possivel efetuar a criação do seu pedido');
    }

    if(!data.total_price || typeof data.total_price !== 'number' || isNaN(data.total_price) || data.total_price <= 0 || data.total_price > 20000){
      throw new Error('Preço inferido esta incorreto')
      
    }

    if(!data.status || typeof data.status !== 'string' ||!['aberto', 'fechado', 'pendente'].includes(data.status.toLowerCase())){
      throw new Error('compra invalida!')
    } 
  }
}