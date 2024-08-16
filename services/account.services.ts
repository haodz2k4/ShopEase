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

export const getAccount = async (id: string) :Promise<IAccount> => {
    const account = await Account.findOne({_id: id, deleted: false})
    if(!account){
        throw new ApiError(404,"Account is not found")
    }
    return account
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

export const editAccount = async (id:string,value: IAccount) :Promise<IAccount> => {
    const isExists= await Account.isEmailExists(value.email);
    if(isExists && value.email){
        throw new ApiError(404,"Email already exists")
    }
    const account = await Account.findByIdAndUpdate(id, value)
    if(!account){
        throw new ApiError(404,"Account is not found")
    }
    return account
} 

export const deleteAccountById = async (id: string) :Promise<IAccount> => {
    const account = await Account.findByIdAndUpdate(id,{deleted: true}).select("deleted")
    if(!account){
        throw new ApiError(404, "Account is not found")
    }
    return account
}