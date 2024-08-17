import {NextFunction, Request, Response} from "express"
import { catchAsync } from "../../utils/catchAsync"
import * as UserService from "../../services/user.services";
import * as AuthService from "../../services/auth.services";
import * as TokenService from "../../services/token.services"
import ApiError from "../../utils/ApiError";

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

//[GET] "/users/logout"
export const logout = catchAsync(async (req: Request, res: Response) => {
    if(!req.headers.authorization){
        throw new ApiError(400,"Token not provided")
    }
    const token = req.headers.authorization.split(" ")[1]

    await TokenService.addTokenToBlackList(token);
    res.status(200).json({message: "Signed out successfully"})
}) 

//[GET] "/user/profile"
export const profile = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user 
    res.status(200).json({user})
})