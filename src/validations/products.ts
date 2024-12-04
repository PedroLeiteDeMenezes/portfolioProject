import { Request, Response } from 'express';
import Product from '../models/product';

export default class validateProduct{
  async createProduct(data:any):Promise<string[]>{
    const errors: string[] = []

    if(!data.name || typeof data.name !== 'string'){
      errors.push('O item deve ser escrito com letras')
    }
    
    if(!data.description || typeof data.description !== 'string'){
      errors.push('A descrição do produto deve ser escrita com letras')
    }

    if (!data.preco || typeof data.preco !== 'number' || isNaN(data.preco)) {
      errors.push('O preço deve ser um número válido');
    }    

    const productExist = await Product.findOne({where: {name: data.name}})
    if(productExist){
      errors.push('Um produto com esse nome já existe')
    }

    return errors
  }
}