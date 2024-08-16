
import {Request, Response} from "express";
import { catchAsync } from "../../utils/catchAsync";
import * as AccountService from "../../services/account.services";
//[GET] "/admin/accounts"
export const index = catchAsync(async (req: Request, res: Response) => {
    const accounts = await AccountService.getAccountsByQuery();

    res.json(accounts)
}) 