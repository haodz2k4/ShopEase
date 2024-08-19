import redis from "../config/redis"

export const cacheSet = async (cacheKey: string, duration: number = 3600,value: Record<string, any>):Promise<void> => {

    await redis.setex(cacheKey,duration,JSON.stringify(value));
}

export const cacheGet = async (cacheKey: string):Promise<Record<string,any> | null> => {
    const cached = await redis.get(cacheKey) 
    if(cached){
        return JSON.parse(cached)
    }
    return null
}

export const addKeyToGroup  = async (groupKey: string, cacheKey: string) => {
    try {
        await redis.sadd(groupKey,cacheKey)
    } catch (error) {
        throw new Error("Error setUp cache: "+ error)
    }
}

export const clearCacheGroup = async (groupKey: string) => {
    try {
        const cacheKeys = await redis.smembers(groupKey);
        if (cacheKeys.length > 0) {
            const pipeline = redis.pipeline();
            cacheKeys.forEach(item => pipeline.del(item))
            pipeline.del(groupKey)
            await pipeline.exec()
        }
    } catch (error) {
        throw new Error("Error clearing cache group: " + error);
    }
};