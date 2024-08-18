import ApiError from "../utils/ApiError"
import { getAccountByEmail, getAccountById } from "./account.services"
import { getUserByEmail } from "./user.services"
import ForgotPassword from "../models/forgot-password.model"

export const loginAdminWithEmailAndPassword = async (email: string, password: string) => {
    const account = await getAccountByEmail(email)
    if(!account || !(await account.isPasswordMatch(password))){
        throw new ApiError(401,"Incorrect email or password")
    }

    return account
}

export const verifyAdminPassword = async (account_id: string,password: string) :Promise<boolean> => {
    const account = await getAccountById(account_id);
    if(!await account.isPasswordMatch(password)){
        return false 
    }
    return true 

}

export const loginUserWithEmailAndPassword = async (email: string, password: string) => {
    const user = await getUserByEmail(email);
    if(!await user.isPassworMatch(password)){
        throw new ApiError(400,"Invalid password")
    }
    return user 
}

export const createForgotPass = async (email: string, otp: string) => {
    return  await ForgotPassword.create({email, otp, expireAt: Date.now() + 3*60*1000})
}

export const getForgotPassbyEmailAndCode = async (email: string, otp: string) :Promise<boolean> => {
    const forgotPass = await ForgotPassword.findOne({email, otp})
    return !!forgotPass
} 

export const deleteForgotPassByEmail = async (email: string)=> {
    await ForgotPassword.deleteOne({email})
}