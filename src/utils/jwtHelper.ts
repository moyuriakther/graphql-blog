import jwt, { Secret } from 'jsonwebtoken'
import config from '../config'

export const jwtHelper = async(userId: number, secret: Secret) =>{
   return jwt.sign({userId: userId}, secret, {expiresIn: '5d'})
}

export const jwtVerify = async(token: string) =>{
   try {
      const userInfo = await jwt.verify(token, config.jwt.secret as string) as {userId: number}
         return userInfo
   } catch (error) {
      return null
   }
}