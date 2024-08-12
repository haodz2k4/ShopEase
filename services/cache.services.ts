
import redis from "../config/redis";

export const setCache = async (key: string, value: any,ttl: number = 3600) => {
    try {
        await redis.set(key,JSON.stringify(value),'EX', ttl)
    } catch (error) {
        throw new Error("Error setting cache: "+ error)
    }
} 

export const getCache = async (key: string) => {
    try {
        const data = await redis.get(key) 
        return data ? JSON.parse(data) : null
    } catch (error) {
        throw new Error("Error getting cache: "+error)
    }
}

export const deleteCache = async (key: string) => {
    try {
        await redis.del(key)
    } catch (error) {
        throw new Error("Error delete cache: "+error)
    }
}