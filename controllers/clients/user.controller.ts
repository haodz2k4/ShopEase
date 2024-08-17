import {Request, Response} from "express"
import { catchAsync } from "../../utils/catchAsync"
import * as UserService from "../../services/user.services";

//[POST] "/users/register"
export const register = catchAsync(async (req: Request, res: Response) => {
    const body = req.body
    const user = await UserService.createUser(body)
    res.status(201).json({message: "Register user successfull", user})
})