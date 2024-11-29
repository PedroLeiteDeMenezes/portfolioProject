import { Request } from 'express'
import User from '../models/user'
import validator from 'validator'
import { json } from 'sequelize'

export default class validateUser{
  async createUser(data:any): Promise<string[]>{
    const errors: string[] = []
    
    if(!data.firstName || typeof data.firstName !== 'string'){
      errors.push('O primeiro nome deve ser escrito com letras')
    }

    if(!data.lastName || typeof data.lastName !== 'string'){
      errors.push('O sobrenome tambem deve ser escrito com letras')
    }

    if(!data.email || typeof data.email !== 'string' || !validator.isEmail(data.email)){
      errors.push('Requer um email Valido')
    }

    if(!data.password || data.password.length < 6){
      errors.push('A senha precisa ter 6 characters ou mais')
    }

    const userExist = await User.findOne({ where: { email: data.email } });
    if(userExist){
      errors.push('Um usuario com este email já existe em nosso banco de dados')
    }
    return errors
  }

  static async getAll(req: any, res:any) {
    try{
      const getUserAll: User[] = await User.findAll({
        attributes: ['id','firstName','lastName', 'email', 'permissions']
      })

      return res.json(getUserAll)
    }catch(error){
      console.error('Errro ao pegar todos os usuarios do banco')
      return res.status(500).json({error: 'Erro interno no servidor'})
    }
  }

}