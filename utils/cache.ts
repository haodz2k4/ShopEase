import redis from "../config/redis"

export const setCacheGroup = async (groupKey: string, cacheKey: string) => {
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
            await redis.del(...cacheKeys);
        }
        await redis.del(groupKey);
    } catch (error) {
        throw new Error("Error clearing cache group: " + error);
    }
};