import { Request, Response } from 'express';
import Product from '../models/product';
import validateProduct from '../validations/products';

class ProductController{
  public static async post(req:Request, res: Response):Promise<any>{
    try{
      const {name, description, preco, image} = req.body
      
      const validator = new validateProduct()
      const errors = await validator.createProduct(req.body)

      if(errors.length > 0){
        return res.status(400).json({errors})
      }

      const newProduct = await Product.create({
        name: String(name),
        description: String(description),
        preco: Number(preco),
        image: String(image)
      })
      return res.status(201).json(newProduct)
    }catch(error:any){
      console.error('Erro ao Criar o produto', error);
      res.status(500).json({error: error.message})
    }
  }

  public static async getAll(req:Request, res:Response){
    await validateProduct.getAll(req, res)
  }

  public static async put(req:Request, res:Response){
    const validate = new validateProduct
    await validate.update(req, res)
  }

  public static async delete(req:Request, res:Response){
    const validator = new validateProduct
    await validator.delete(req, res)
  }
}
export default ProductController