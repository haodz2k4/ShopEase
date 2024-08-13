import { catchAsync } from "../../utils/catchAsync";
import { Request, Response } from "express";
//Service 
import * as ProductService from "../../services/product.services"
//[GET] "/admin/products"
export const index = catchAsync(async (req: Request, res: Response) => {
    const products = await ProductService.getProductsByQuery();
    res.json({products})
})