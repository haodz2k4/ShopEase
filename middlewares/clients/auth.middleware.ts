import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import ApiError from "../../utils/ApiError";
//service 
import * as TokenService from "../../services/token.services"
import * as UserService from "../../services/user.services"

export const requireAuth = (catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization){
        throw new ApiError(401,"Tokens are not provided")
    }
    const token = await req.headers.authorization.split(" ")[1]
    //check black list  
    const isExistsInBlacklist = await TokenService.isExistsTokenInBlacklist(token);
    if(isExistsInBlacklist){
        throw new ApiError(404,"Invalid token")
    }
    const verify = await TokenService.verifyToken(token)
    if(typeof verify === "object" && 'user_id' in verify){
        const user = await UserService.getUserById(verify.user_id);
        res.locals.user = user 
        next()

    }else{
        throw new ApiError(401,"Invalid token ")
    }

}))