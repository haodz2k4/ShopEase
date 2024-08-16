import {Request, Response} from "express";
import { catchAsync } from "../../utils/catchAsync";
import * as AuthService from "../../services/auth.services";
import * as TokenService from "../../services/token.services";
//[POST] "/admin/auth/login"
export const login = catchAsync(async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password; 

    const account = await AuthService.loginAdminWithEmailAndPassword(email, password);
    const token = TokenService.generateToken({account_id: account.id})
    res.status(200).json({message: "Login successfull", account,token})
})
