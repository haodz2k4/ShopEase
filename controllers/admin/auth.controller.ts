import jwt from 'jsonwebtoken';
import {Request, Response} from "express";
import { catchAsync } from "../../utils/catchAsync";
import * as AuthService from "../../services/auth.services";
import * as AccountService from "../../services/account.services"
import * as TokenService from "../../services/token.services";
import redis from "../../config/redis";
import ApiError from "../../utils/ApiError";
//[POST] "/admin/auth/login"
export const login = catchAsync(async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password; 

    const account = await AuthService.loginAdminWithEmailAndPassword(email, password);
    const token = TokenService.generateToken({account_id: account.id})
    res.status(200).json({message: "Login successfull", account,token})
})

//[GET] "/admin/auth/logout"
export const logout = catchAsync(async (req: Request, res: Response) => {
    if(!req.headers.authorization){
        throw new ApiError(404,"No token provided")
    } 
    const token = req.headers.authorization.split(" ")[1];
    
    await TokenService.addTokenToBlackList(token)
    res.status(200).json({message: "Successfully logged out"})
}) 

