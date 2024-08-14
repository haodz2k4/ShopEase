import { catchAsync } from "../../utils/catchAsync";
import {pick} from "../../utils/pick";
import { Request, Response } from "express";
//Service 
import * as ProductService from "../../services/product.services"
//[GET] "/admin/products"
export const index = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query,["status"]);
    const sort = pick(req.query,["sortKey","sortValue"])
    const pagination = res.locals.pagination
    const products = await ProductService.getProductsByQuery(filter,sort,pagination,"-deleted");
    res.json({products, pagination})
})
//[GET] "/admin/products/detail/:id"
export const detail = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = await ProductService.getProductById(id);
    res.status(200).json({product})
}) 

//[GET] "/admin/products/change-status/:id"
export const changeStatus = catchAsync(async(req: Request, res: Response) => {
    const id = req.params.id;
    const status = req.body.status;
    const product = await ProductService.changeStatus(id, status);
    res.status(200).json({message: "Status change successful",product})
})