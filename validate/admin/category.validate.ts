import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
//validator 
import { isURL } from "validator";
import ApiError from "../../utils/ApiError";
import { existsCategoryId } from "../../services/category.services";
export const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const thumbnail = req.body.thumbnail;
    if(typeof thumbnail === "string"){
        if(!isURL(thumbnail)){
            throw new ApiError(404,"thumbnail link is invalid ")
        }
    }
    const parent_category = req.body.parent_category
    const isExists = existsCategoryId(parent_category);
    if(!isExists){
        throw new ApiError(404,"parent_category is not exists")
    }


    next()
})