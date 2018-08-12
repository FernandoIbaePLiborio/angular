import { apiConfig } from './api-config';
import { Request, Response } from 'express'
import { User, users } from './users'
import * as jwt from 'jsonwebtoken'

export const handleAuthentication = (req: Request, resp: Response)=>{
    const user: User = req.body

    if (isValid(user)){
        const dbUser = users[user.email]
        const token = jwt.sign({sub: dbUser.email, iss: 'meat-api'}, apiConfig.secret)
        //sub: quem é o portador do token (usuario), iss: quem esta emitindo o token (minha api),
        //password para poder assinar o token (assinatura)
        resp.json({name: dbUser.name, email: dbUser.email, accessToken: token})
    }else {
        resp.status(403).json({message: 'Dados Inválidos.'})
    }

    function isValid(user: User): boolean {
        if(!user){
            return false
        }
        const dbUser = users[user.email]
        return dbUser !== undefined && dbUser.matches(user)
    }

}