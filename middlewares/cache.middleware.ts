import {Request, Response, NextFunction} from "express";
import redis from "../config/redis";
export const cacheMiddleware = (duration: number) => {
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
            next()
        } catch (error) {
            next(error)
        }
    }
}