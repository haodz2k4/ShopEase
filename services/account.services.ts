import Account,{IAccount} from "../models/account.model";

export const getAccountsByQuery = async  ():Promise<IAccount[]> => {
    const accounts = await Account
    .find({deleted: false})
    .populate('role_id','title')

    return accounts
}
