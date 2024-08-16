import Account,{IAccount} from "../models/account.model";
import ApiError from "../utils/ApiError";

export const getAccountsByQuery = async  (filter: Record<string, any>, pagination: Record<"skip" | "limit", number>):Promise<IAccount[]> => {
    const accounts = await Account
    .find({...filter, deleted: false})
    .populate('role_id','title')
    .skip(pagination.skip)
    .limit(pagination.limit)

    return accounts
}

export const getTotalAccountByQuery = async (filter: Record<string, any>) :Promise<number> => {
    return await Account.countDocuments({...filter, deleted: false})
}

export const createAccount = async (value: IAccount) :Promise<IAccount> => {

    const isExists= await Account.isEmailExists(value.email);
    if(isExists){
        throw new ApiError(404,"Email already exists")
    }
    return await Account.create(value);
  
}