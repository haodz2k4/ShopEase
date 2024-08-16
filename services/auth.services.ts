import ApiError from "../utils/ApiError"
import { getAccountByEmail } from "./account.services"

export const loginAdminWithEmailAndPassword = async (email: string, password: string) => {
    const account = await getAccountByEmail(email)
    if(!account || !(await account.isPasswordMatch(password))){
        throw new ApiError(401,"Incorrect email or password")
    }

    return account
}