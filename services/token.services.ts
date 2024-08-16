import jwt from "jsonwebtoken"
import config from "../config/config";

export const generateToken = (payload: Record<string, string>) => {
    
    return jwt.sign(payload,config.jwt.secret as string,{expiresIn: '60m'})
} 

export const verifyToken = (token: string) => {
    return jwt.verify(token, config.jwt.secret as string)
}


