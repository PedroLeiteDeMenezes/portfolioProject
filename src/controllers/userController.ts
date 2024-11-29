import { Request, Response } from 'express';
import User from '../models/user';
import validateUser from '../validations/User';
import bcrypt from 'bcryptjs'

class Usercontroller {
  public static async post(req:Request, res: Response): Promise<any>{
    try{
      const {firstName, lastName, email, password, permissions} = req.body;

      const validator = new validateUser()
      const errors = await validator.createUser(req.body)

      if(errors.length > 0){
        return res.status(400).json({errors})
      }

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = await User.create({
        firstName: String(firstName),
        lastName: String(lastName),
        email: String(email),
        password_hash: hashedPassword,
        permissions: permissions
      });
      return res.status(201).json(newUser)
    }catch(error:any){
      console.error('Erro ao criar Usuario', error)
      res.status(500).json({error: error.message})
    }
  }

  static async getAll(req:Request, res: Response): Promise<any>{
    try{
      await validateUser.getAll(req, res)
    }catch(error){
      console.log('Erro ao pegar todos os usuarios', error);
      return res.status(500).json({error: 'Erro interno do servidor'})
    }
  }


}
export default Usercontroller