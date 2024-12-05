import { Request, Response } from 'express'
import User from '../models/user'
import validator from 'validator'
import { json } from 'sequelize'

export default class validateUser{
  private async userExist(data:any) {
    const errors: string[] = []
    const userExist = await User.findOne({ where: { email: data.email } });
    if(userExist){
      errors.push('Um usuario com este email já existe em nosso banco de dados')
    }
    return errors
  }

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

    const userErrors = await this.userExist(data)
    errors.push(...userErrors)

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

  async loginValidate(data:any): Promise<{errors:string []; user:any}>{
    const errors: string[] = []
    const {email, password} = data

    if(!password){
      errors.push('Senha ou email invalidos')
    }

    const user = await User.findOne({where: {email: email}})
    if(!user){
      errors.push('Email ou senha invalidos')
    }
    
    return{errors, user}
  }

  async delete(req:Request, res:Response){
    const errors: string[] = []
    const userId = req.params.id

    console.log(`Requisição para deletar o usuario com id: ${userId}`);
    
    const user = await User.findByPk(userId)
    if(!user){
      return res.status(404).json({error: 'User not found'})
    }

    await user.destroy()
    return res.json({message: `Usuario com id ${userId} deletado com sucesso`})
  }

  async getUserId(userId: string):Promise<User | null>{
    try{
      const getUser = await User.findByPk(userId);
      if(!getUser){
        return null
      }
      return getUser
    }catch(error){
      console.log(`Erro ao pegar o usuario: ${error}`);
      throw new Error('Erro interno no servidor')
    }
  }

  async update(req:Request, res:Response){
    const userId = req.params.id
    console.log(`Usuario com id ${userId} indo para edição`);
    
    const user = await User.findByPk(userId)
    if(!user){
      return res.status(404).json({error: 'Usuario não encontrado'})
    }
    const userUpdate = await user.update(req.body)
    return res.json(userUpdate)
  }
}