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

  static async getAll(req:Request, res:Response){
    try{
      const getProductAll: Product[] = await Product.findAll({
        attributes: ['id', 'name', 'description', 'preco', 'image']
      })
  
      return res.json(getProductAll)
    }catch(error){
      console.error('Erro ao pegar todos os produtos do banco de dados')
      return res.status(500).json({error: 'Erro interno do servidor'})
    }
  }

  async update(req: Request, res:Response){
    const productId = req.params.id

    const product = await Product.findByPk(productId)

    if(!product){
      return res.status(404).json({error: 'Produto com esse id não existe no nosso banco de dados'})
    }

    const productUpdated = await product.update(req.body)
    return res.json(productUpdated)
  }

  async delete(req:Request, res:Response){
    const productId = req.params.id

    const product = await Product.findByPk(productId)
    if(!product){
      return res.status(404).json({error: 'Produto não encontrado'})
    }

    await product.destroy()
    return res.json({message: `Produto com o id ${productId} deletado com sucesso`})
  }

  async getproductId(productId: string){
    try{
      const getProduct = await Product.findByPk(productId)
      
      if(!getProduct){
        return null
      }

      return getProduct
    }catch(error){
      console.log(`Erro ao pegar o produto ${error}`);
      throw new Error('Erro interno no servidor')
    }
  }
}