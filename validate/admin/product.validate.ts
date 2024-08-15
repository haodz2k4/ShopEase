import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { isURL } from "validator";
import ApiError from "../../utils/ApiError";
import { existsCategoryId } from "../../services/category.services";
export const create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const thumbnail = req.body.thumbnai;
    if(typeof thumbnail === "string"){
        if(!isURL(thumbnail)){
            throw new ApiError(400,"thumbnail link is invalid")
        }
    }
    const category_id = req.body.category_id
    const isExists = existsCategoryId(category_id);
    if(!isExists){
        throw new ApiError(404,"category_id is not exists")
    }
    next()
})