import { Request, Response, NextFunction } from "express"
import { catchAsync } from "../../utils/catchAsync"
import Product from "../../models/product.model"
import WareHouse from "../../models/warehouse.model"
import Supplier from "../../models/supplier.model";
import ApiError from "../../utils/ApiError";

export const create = catchAsync( async (req: Request, res: Response, next: NextFunction) :Promise<void> => {
    const product_id = req.body.product_id
    const product = await Product.exists({_id: product_id})
    if(!product){
        throw new ApiError(400,"product_id is not exists")
    }

    const supplier_id =req.body.supplier_id
    const supplier = await Supplier.exists({_id: supplier_id});
    if(!supplier){
        throw new ApiError(400,"supplier_id is not exists")
    }
    const wareHouse_id =req.body.wareHouse_id
    const wareHouse = await WareHouse.exists({_id: wareHouse_id})
    if(!wareHouse){
        throw new ApiError(400,"wareHouse_id is not exists")
    }
    next()
})

export const edit = catchAsync( async (req: Request, res: Response, next: NextFunction) :Promise<void> => {
    const product_id = req.body.product_id
    const product = await Product.exists({_id: product_id})
    if(!product){
        throw new ApiError(400,"product_id is not exists")
    }

    const supplier_id =req.body.supplier_id
    const supplier = await Supplier.exists({_id: supplier_id});
    if(!supplier){
        throw new ApiError(400,"supplier_id is not exists")
    }
    const wareHouse_id =req.body.wareHouse_id
    const wareHouse = await WareHouse.exists({_id: wareHouse_id})
    if(!wareHouse){
        throw new ApiError(400,"wareHouse_id is not exists")
    }
    next()
})