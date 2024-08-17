import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";

import * as AccountService from "../../services/account.services"
//[GET] "/admin/my-accounts"
export const index = catchAsync(async (req: Request, res: Response) => {
    const account = res.locals.account;
    res.status(200).json({account})
}) 

//[PATCH] "/admin/my-accounts/update"
export const updateAccount =catchAsync(async (req: Request, res: Response) => {
    const id = res.locals.account.id;
    const body = req.body
    const account = await AccountService.updateAccountById(id, body);
    res.status(200).json({message: "Updated account successfully", account})
})


