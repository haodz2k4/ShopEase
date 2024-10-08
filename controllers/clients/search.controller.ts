import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { pick } from "../../utils/pick";
//services 
import * as ProductService from "../../services/product.services" 
import * as CacheService from "../../services/cache.services"
import {getTotalQuantities} from "../../services/stock.services"
import paginate from "../../helpers/paginate.helper";
import { rangePrice } from "../../helpers/price.helper";
//[GET] "/search"
export const index = catchAsync(async (req: Request, res: Response) => {

    const filter: Record<string, any> = {}
    
    //search 
    const search = pick(req.query,["keyword"])
    if(typeof search.keyword === "string"){
        filter.title = search.keyword.split(" ").map(item => new RegExp(item,"i"))
    }
    //range price 
    const minPrice = parseInt(req.query.minPrice as string) 
    const maxPrice = parseInt(req.query.maxPrice as string)
    if(!isNaN(minPrice) && !isNaN(maxPrice)){
        filter.price = rangePrice(minPrice, maxPrice)
    }
    //sort 
    const sort = pick(req.query,["sortKey","sortValue"])
    //pagination 
    const counts = await ProductService.getTotalProductByQuery(filter)
    const page = parseInt(req.query.page as string) || 1 
    const limit = parseInt(req.query.limit as string) || 30 
    const pagination = paginate(counts,{page, limit})

    //select field
    const selectField = "title thumbnail price discountPercentage slug"
    filter.status = "active"
    const products = await ProductService.getProductsByQuery(filter,sort, pagination,selectField)
    const quantities = await Promise.all(products.map(item => getTotalQuantities(item._id)))
    products.forEach((item, index) => {
        item.quantity = quantities[index]
    })
    const cacheKey =res.locals.cacheKey 
    const cacheDuration = res.locals.cacheDuration 
    await CacheService.cacheSet(cacheKey, cacheDuration,{products, pagination})

    res.status(200).json({products, pagination})
    
}) 