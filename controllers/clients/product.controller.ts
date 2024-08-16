import {Request, Response, NextFunction} from "express"
import redis from "../../config/redis";
import { catchAsync } from "../../utils/catchAsync"
import { pick } from "../../utils/pick"
//helpers 
import {rangePrice} from "../../helpers/price.helper";
import paginate from "../../helpers/paginate.helper";
//services
import * as ProductService from "../../services/product.services";
import * as CategoryService from "../../services/category.services";
import { getTotalQuantities } from "../../services/stock.services";
//[GET] "/products"
export const index = catchAsync(async (req: Request, res: Response) => {
    const listQuery: string[] = ["title"]
    //range price
    const minPrice = parseInt(req.query.minPrice as string) 
    const maxPrice = parseInt(req.query.maxPrice as string)
    if(!isNaN(minPrice) && !isNaN(maxPrice)){
        listQuery.push("price")
        req.query.price = rangePrice(minPrice, maxPrice)
    } 
    //end range price 

    //filter 
    const filter = pick(req.query,listQuery);
    filter.status = "active"
    //pagination
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 15;

    const totalDoucment = await ProductService.getTotalProductByQuery(filter)
    const pagination = paginate(totalDoucment,{page,limit})
    //end pagination 

    //sort 
    const sort = pick(req.query,["sortKey","sortValue"])
    const products = await ProductService.getProductsByQuery(filter,sort,pagination,"title thumbnail price discountPercentage slug")
    //add field quantity 
    const quantities = await Promise.all(products.map(item => getTotalQuantities(item._id)))
    products.forEach((item, index) => {
        item.quantity = quantities[index];
    })
    const responsePayload = {products, pagination}
    //caching 
    const key = res.locals.cacheKey 
    const duration = res.locals.cacheDuration 
    await redis.setex(key,duration, JSON.stringify(responsePayload))
    res.json(responsePayload)
    
})

//[GET] "/products/:slugCategory"
export const category = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slugCategory;
    const id = await CategoryService.convertSlugToId(slug)
    const filter = pick(req.query,["title"])
    filter.category_id = id 
    filter.status = "active"
    //pagination    
    const page = parseInt(req.query.page as string) | 1
    const limit = parseInt(req.query.limit as string) | 15;

    const totalDoucment = await ProductService.getTotalProductByQuery(filter)
    const pagination = paginate(totalDoucment,{page,limit})
    //end pagination 
    const fieldSelect = "title thumbnail price discountPercentage slug";
    const products = await ProductService.getProductsByQuery(filter,{position: 'desc'},pagination,fieldSelect);
    //add field quantity 
    const quantities = await Promise.all(products.map(item => getTotalQuantities(item._id)))
    products.forEach((item, index) => {
        item.quantity = quantities[index]
    })
    res.json({products, pagination})

})

//[GET] "/products/detail/:slug"
export const detail = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slug;
    const product = await ProductService.getProductBySlug(slug);
    product.quantity = await getTotalQuantities(product._id)
    //handle caching 
    const key = res.locals.cacheKey 
    const duration = res.locals.cacheDuration;
    await redis.setex(key,duration,JSON.stringify(product))
    res.status(200).json({product})
})