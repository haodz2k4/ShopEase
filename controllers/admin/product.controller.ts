import { catchAsync } from "../../utils/catchAsync";
import {pick} from "../../utils/pick";
import { NextFunction, Request, Response } from "express";
import redis from "../../config/redis";
//helper 
import paginate from "../../helpers/paginate.helper";
//Service 
import * as ProductService from "../../services/product.services"
import { model } from "mongoose";
//[GET] "/admin/products"
export const index = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query,["status","title"]);
    const sort = pick(req.query,["sortKey","sortValue"])
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 15
    const pagination = await paginate(model('product'),filter,{page, limit})
    
    const products = await ProductService.getProductsByQuery(filter,sort,pagination,"-deleted");
    //handle cache 
    const cacheKey = res.locals.cacheKey 
    const cacheDuration = res.locals.cacheDuration
    await redis.setex(cacheKey,cacheDuration,JSON.stringify(products))
    res.json({products, pagination})
})
//[GET] "/admin/products/detail/:id"
export const detail = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = await ProductService.getProductById(id);
    res.status(200).json({product})
}) 

//[GET] "/admin/products/change-status/:id"
export const changeStatus = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const status = req.body.status;
    const product = await ProductService.changeStatus(id, status);
    res.status(200).json({message: "Status change successful",product})
    next()
})