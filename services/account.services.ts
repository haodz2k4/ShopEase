import Account,{IAccount} from "../models/account.model";

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
