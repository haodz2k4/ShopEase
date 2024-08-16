import ApiError from "../utils/ApiError"
import { catchAsync } from "../utils/catchAsync"
import {Response, Request, NextFunction} from "express"

export const requireAuth = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization){
        throw new ApiError(404,"Please send request with token")
    }
    const token = req.headers.authorization.split(" ")[1];

    
})