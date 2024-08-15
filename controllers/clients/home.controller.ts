import {Request, Response,NextFunction} from "express";
import { catchAsync } from "../../utils/catchAsync";
import { pick } from "../../utils/pick";
import { model } from "mongoose";
//helpers
import paginate from "../../helpers/paginate.helper";
//services 
import * as ProductService from "../../services/product.services";
//[GET] "/"
export const index = catchAsync(async (req: Request, res: Response) => {

    const filter = {status: "active", highlighted: "1"}

    const page = parseInt(req.query.pageHightLightTed as string) | 1
    const limit = parseInt(req.query.limitHightLightTed as string) | 30
    const pagination = await paginate(model('product'),filter,{page, limit})
    const hightLightedProducts = await ProductService
        .getProductsByQuery(
            filter,
            {position: 'desc'},
            pagination,
            "title thumbnail price discountPercentage slug"
        )
        
    res.json({hightLightedProducts})
})