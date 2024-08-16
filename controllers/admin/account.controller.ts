import {Request, Response} from "express";
import { catchAsync } from "../../utils/catchAsync";
import { pick } from "../../utils/pick";
import paginate from "../../helpers/paginate.helper";
//services 
import * as AccountService from "../../services/account.services";
//[GET] "/admin/accounts"
export const index = catchAsync(async (req: Request, res: Response) => {
    //filter 
    const filter = pick(req.query,["fullName","role_id","status"])
    //pagination 
    const totalDocument = await AccountService.getTotalAccountByQuery(filter)
    const page = parseInt(req.query.page as string) | 1 
    const limit = parseInt(req.query.limit as string) | 10
    const pagination = paginate(totalDocument,{page, limit})

    const accounts = await AccountService.getAccountsByQuery(filter, pagination);

    res.json(accounts)
}) 

