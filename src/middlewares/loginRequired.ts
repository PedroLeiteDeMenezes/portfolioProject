import { Request, Response, NextFunction } from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken'

interface TokenPayload extends JwtPayload{
  id: number;
  email: string
}

export default class loginRequired{
  static async required(req: Request, res: Response, next: NextFunction): Promise<any> {
    const {authorization} = req.headers
    console.log(req.headers);
    
    if(!authorization){
      return res.status(401).json({
        errors: ['Você precisa fazer login para fazer essa mudança']
      })
    }

    const [, token] = authorization.split(' ')
    const tokenSecret = process.env.TOKEN_SECRET
    if(!tokenSecret){
      return res.status(500).json({
        errors: ['Erro interno no servidor: TOKEN_SECRET não foi definido']
      })
    }

    try{
      const datas = jwt.verify(token, tokenSecret) as TokenPayload;
      req.userId = datas.id
      req.userEmail = datas.email
      console.log(req.userId, req.userEmail);
      console.log(`User id foi definido no login requerido ${req.userId}`);
      
      return next()
    }catch{
      return res.status(401).json({
        errors: ['Token expirado']
      })
    }

  }
}