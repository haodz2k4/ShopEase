import ApiError from "../utils/ApiError"
import { getAccountByEmail, getAccountById } from "./account.services"

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