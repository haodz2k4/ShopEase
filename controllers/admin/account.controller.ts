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

    res.json({accounts, pagination})
}) 


//[POST] "/admin/create"
export const create = catchAsync(async (req: Request, res: Response) => {
    const body = req.body;
    const account = await AccountService.createAccount(body);
    res.status(201).json({message: "Created account successfully", account})
})

//[PATCH] "/admin/edit/:id"
export const edit = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const body = req.body
    const account = await AccountService.updateAccountById(id,body);
    res.status(200).json({message: "Edited account successfully",account})
})

//[PATCH] "/admin/delete/:id"
export const deleteAccount = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id
    const account = await AccountService.deleteAccountById(id);
    res.status(200).json({message: "Deleted account successfully", account})
})