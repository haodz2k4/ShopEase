import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { isEmail } from "validator";
import ApiError from "../../utils/ApiError";
export const create = catchAsync(async (req: Request, res:  Response, next: NextFunction) => {

    const email = req.body.email 
    if(typeof email === "string"){
        if(!isEmail(email)){
            throw new ApiError(404,"Message")
        }
        
    }

    next()
})