import {Request, Response, NextFunction} from "express";
import redis from "../config/redis";
import { setCacheGroup, clearCacheGroup } from "../utils/cache";
export const cacheMiddleware = (duration: number, keyGroup: string) => {
    return async (req: Request, res: Response, next: NextFunction) :Promise<void> => {
        const key = `${req.method}:${req.originalUrl}`
        try {
            const cachedData = await redis.get(key);
            if(cachedData){
                res.json(JSON.parse(cachedData))
                return
            }
            res.locals.cacheKey = key;
            res.locals.cacheDuration = duration 
            await setCacheGroup(keyGroup,key)
            next()
        } catch (error) {
            next(error)
        }
    }
}

export const clearCacheMiddleware = (groupKey: string) => {
    return async (req: Request, res: Response,next: NextFunction) :Promise<void> => {
        try {
            await clearCacheGroup(groupKey)
        } catch (error) {
            next(error)
        }
    }
}