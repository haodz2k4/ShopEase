import ApiError from "../../utils/ApiError"
import { catchAsync } from "../../utils/catchAsync"
import {Response, Request, NextFunction} from "express"
import * as TokenService from "../../services/token.services";
import {getAccountById} from "../../services/account.services"
import redis from "../../config/redis";

export const requireAuth = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization){
        throw new ApiError(401,"Please send request with token")
    }
    const token = req.headers.authorization.split(" ")[1];
    const encode = TokenService.verifyToken(token)
    if (typeof encode === 'object' && 'account_id' in encode) {
        const isBlacklisted= await redis.get(token);
        if(isBlacklisted === 'blacklisted'){
            throw new ApiError(401,"Invalid token payload")
        }
        const account = await getAccountById(encode.account_id);
        if (!account) {
            throw new ApiError(401, "Account not found");
        }
        res.locals.account = account
        next();
    } else {
        throw new ApiError(401, "Invalid token payload");
    }
    
})