import jwt from "jsonwebtoken"
import config from "../config/config";
import redis from "../config/redis";

export const generateToken = (payload: Record<string, string>) => {
    
    return jwt.sign(payload,config.jwt.secret as string,{expiresIn: '60m'})
} 

export const verifyToken = (token: string) => {
    return jwt.verify(token, config.jwt.secret as string)
}

export const addTokenToBlackList = async (token: string) => {
    const decoded = jwt.decode(token) as jwt.JwtPayload
    const expireAt = decoded.exp as number - Math.floor(Date.now() / 1000)
    await redis.setex(token,expireAt,'blacklisted')
}