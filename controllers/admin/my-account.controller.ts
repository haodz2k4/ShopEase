import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { verifyAdminPassword } from "../../services/auth.services";
import * as AccountService from "../../services/account.services"
import ApiError from "../../utils/ApiError";
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

//[POST] "/admin/my-accounts/confirm-password"
export const confirmPassword  = catchAsync(async (req: Request, res: Response) => {
    const currentPassword = req.body.password
    const account_id = res.locals.account.id
    const isVerify = await verifyAdminPassword(account_id,currentPassword);
    if(!isVerify){
        throw new ApiError(401,"Incorrect password")
    } 
    res.status(200).json({message: "Password has been verified"})
})

//[POST] "/admin/my-accounts/reset-password"
export const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const account_id = res.locals.account.id
    const newPassword = req.body.password 
    const repeatPassword = req.body.repeatPassword 
    if(newPassword !== repeatPassword){
        throw new ApiError(400,"Repeated password is incorrect")
    }
    await AccountService.updateAccountById(account_id, {password: newPassword})
    res.status(200).json({message: "changed password successfully"})
})


