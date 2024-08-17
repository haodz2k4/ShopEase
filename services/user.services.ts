import User from "../models/user.model"
import ApiError from "../utils/ApiError"


export const createUser = async (boydUser: Record<string, any>) => {
    const isExistsEmail = await User.isEmailExists(boydUser.email)
    if(isExistsEmail){
        throw new ApiError(400,"Email is already exists")
    }
    return User.create(boydUser)
}

export const getUserByEmail = async (email: string) => {
    const user = await User.findOne({email, deleted: false}).select("-deleted");
    if(!user){
        throw new ApiError(404,"Email do not exists")
    }
    return user 
}

export const getUserById = async (id: string) => {
    const user = await User.findOne({_id: id, deleted: false}).select("-deleted");
    if(!user){
        throw new ApiError(404,"User is not found")
    }
    return user 
}