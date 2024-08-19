import {Request, Response,NextFunction} from "express";
import { catchAsync } from "../../utils/catchAsync";
//helpers
import paginate from "../../helpers/paginate.helper";
//services 
import * as ProductService from "../../services/product.services";
import * as CacheService from "../../services/cache.services"
//[GET] "/"
export const index = catchAsync(async (req: Request, res: Response) => {

    const filter = {status: "active", highlighted: "1"}

    const page = parseInt(req.query.pageHightLightTed as string) | 1
    const limit = parseInt(req.query.limitHightLightTed as string) | 30

    const totalDoucment = await ProductService.getTotalProductByQuery(filter)
    const pagination = paginate(totalDoucment,{page, limit})
    const hightLightedProducts = await ProductService
        .getProductsByQuery(
            filter,
            {position: 'desc'},
            pagination,
            "title thumbnail price discountPercentage slug"
        ) 
    const key = res.locals.cacheKey;
    const duration = res.locals.cacheDuration
    await CacheService.cacheSet(key, duration,hightLightedProducts)
        
    res.json({hightLightedProducts})
})