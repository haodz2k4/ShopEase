import User from "../models/user.model"
import ApiError from "../utils/ApiError"


export const createUser = async (boydUser: Record<string, any>) => {
    const isExistsEmail = await User.isEmailExists(boydUser.email)
    if(isExistsEmail){
        throw new ApiError(400,"Email is already exists")
    }
    return User.create(boydUser)
}