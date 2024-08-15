import redis from "../config/redis"

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