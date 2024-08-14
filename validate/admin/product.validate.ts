import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { isURL } from "validator";
import ApiError from "../../utils/ApiError";
export const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const thumbnail = req.body.thumbnai;
    if(typeof thumbnail === "string"){
        if(!isURL(thumbnail)){
            throw new ApiError(400,"thumbnail link is invalid")
        }
    }
   
    next()
})