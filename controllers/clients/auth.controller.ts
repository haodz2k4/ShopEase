
import { catchAsync } from './../../utils/catchAsync';
import { Request, Response} from "express"

import * as UserService from "../../services/user.services";
import * as AuthService from "../../services/auth.services";
import * as TokenService from "../../services/token.services";
import * as EmailService from "../../services/email.services";
import ApiError from '../../utils/ApiError';
import { generateRandomNumber } from '../../helpers/generate.helper';

//[POST] "/auth/register"
export const register = catchAsync(async (req: Request, res: Response) => {
    const body = req.body
    const user = await UserService.createUser(body)
    res.status(201).json({message: "Register user successfull", user})
}) 

//[POST] "/auth/login"
export const login = catchAsync(async (req: Request, res: Response) => {
    const email = req.body.email 
    const password = req.body.password

    const user = await AuthService.loginUserWithEmailAndPassword(email, password)
    const token = await TokenService.generateToken({user_id: user.id})
    res.status(200).json({message: "Login successfully", user, token})
}) 

//[GET] "/auth/logout"
export const logout = catchAsync(async (req: Request, res: Response) => {
    if(!req.headers.authorization){
        throw new ApiError(400,"Token not provided")
    }
    const token = req.headers.authorization.split(" ")[1]

    await TokenService.addTokenToBlackList(token);
    res.status(200).json({message: "Signed out successfully"})
}) 

//[POST] "/auth/forgot-password"
export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
    const email = req.body.email 
    const otp = generateRandomNumber(6);
    const user = await UserService.getUserByEmail(email)
    if(!user){
        throw new ApiError(400, "Email is not found")
    } 
    await AuthService.createForgotPass(email, otp)
    await EmailService.sendOtpEmail(email,user.userName,otp); 

    res.status(200).json({message: "Sended email successfully"})
}) 

//[POST] "/auth/verify-otp"
export const verifyOtp = catchAsync(async (req: Request, res: Response) => {
    const email = req.body.email 
    const otp = req.body.otp 
    const isExists = AuthService.getForgotPassbyEmailAndCode(email, otp)
    if(!isExists){
        throw new ApiError(400,"Invalid otp")
    }
    const resetToken = await TokenService.generateToken({email})
    res.status(200).json({ message: "OTP verified successfully",resetToken });
}) 

//[POST] "/auth/reset-password"
export const resetPassword = catchAsync(async (req: Request, res: Response) => {

    if(!req.headers.authorization){
        throw new ApiError(400,"Token is not provided")
    }
    const token = await req.headers.authorization.split(" ")[1]
    const verifyToken = await TokenService.verifyToken(token)
    if(typeof verifyToken === "object" && 'email' in verifyToken){
        const newPassword = req.body.newPassword 
        const repeatPassword = req.body.repeatPassword 
        if(newPassword !== repeatPassword){
            throw new ApiError(400,"Repeated password is incorrect ")
        }
        
        const user = await UserService.getUserByEmail(verifyToken.email)
        await UserService.updateUserById(user.id, {password: newPassword})
        res.status(200).json({message: "Update password successfull"})
    }else{
       throw new ApiError(404,"Invalid token") 
    }

})