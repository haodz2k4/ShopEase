import {Request, Response} from "express"
import { catchAsync } from "../../utils/catchAsync"
import * as UserService from "../../services/user.services";
import * as AuthService from "../../services/auth.services";
import * as TokenService from "../../services/token.services"

//[POST] "/users/register"
export const register = catchAsync(async (req: Request, res: Response) => {
    const body = req.body
    const user = await UserService.createUser(body)
    res.status(201).json({message: "Register user successfull", user})
}) 

//[POST] "/users/login"
export const login = catchAsync(async (req: Request, res: Response) => {
    const email = req.body.email 
    const password = req.body.password

    const user = await AuthService.loginUserWithEmailAndPassword(email, password)
    const token = await TokenService.generateToken({user_id: user.id})
    res.status(200).json({message: "Login successfully", user, token})
})