import { create } from './../../services/product.services';
import { catchAsync } from "../../utils/catchAsync";
import {pick} from "../../utils/pick";
import { NextFunction, Request, Response } from "express";
import redis from "../../config/redis";
//helper 
import paginate from "../../helpers/paginate.helper";
//Service 
import * as ProductService from "../../services/product.services"
import { model } from "mongoose";
import ApiError from "../../utils/ApiError";
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

//[PATCH] "/admin/products/change-status/:id"
export const changeStatus = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const status = req.body.status;
    const product = await ProductService.changeStatus(id, status);
    res.status(200).json({message: "Status change successful",product})
    next()
})

//[PATCH] "/admin/products/change-multi/:type"
export const changeMulti = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const ids = req.body.ids;
    const type = req.params.type;
    switch(type) {
        case "delete": 
            const infoUpdateDelete = await ProductService.changeMultiDelete(ids);
            res.status(200).json({message: "Deleted multiple products successfully", infoUpdateDelete})
            break;
        case "status":
            const status = req.body.status
            const listChangeStatus = await ProductService.changeMultiStatus(ids,status);
            res.status(200).json({message: "change status multiple products successfully", products: listChangeStatus})
            break;
        case "position":
            const listChangePosition = await ProductService.changeMultiPosition(ids);
            res.status(200).json({message: "change position multiple products successfull", products: listChangePosition})
            break;
        default: 
            throw new ApiError(400,"Type is not valid")
    }   
    next()
})

//[PATCH] "/admin/products/edit/:id"
export const edit = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id 
    const body = req.body
    const product = await ProductService.edit(id,body);
    res.status(200).json({message: "Update product successfull",product})
    next()
})

//[POST] "/admin/products/add"
export const createProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    const product = await ProductService.create(body);
    res.status(201).json({message: "Create product successful", product})
})