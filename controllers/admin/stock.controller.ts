import {Request, Response} from "express";
import { catchAsync } from "../../utils/catchAsync";
import { pick } from "../../utils/pick";
import paginte from "../../helpers/paginate.helper"
//services 
import * as StockService from "../../services/stock.services";
import { model } from "mongoose";
//[GET] "/admin/stocks"
export const index = catchAsync( async (req: Request,res: Response) :Promise<void> => {

    const productsFilter  = pick(req.query,["title"])
    const stocksFilter = pick(req.query,["name"])
    //pagination 
    const limit = parseInt(req.query.limit as string) | 20
    const totalDocument = await StockService.getTotalStock()
    const pagination = paginte(totalDocument,{page: 1,limit})
    const stocks = await StockService.getStocksByQuery(productsFilter,stocksFilter,pagination)
    res.json({stocks, pagination})
}) 

//[GET] "/admin/stocks/detail/:id"
export const detail = catchAsync(async (req: Request, res: Response) :Promise<void> => {
    const id = req.params.id 
    const stock = await StockService.getStockById(id);
    res.json({stock})
})
//[GET] "/admin/stocks/change-quantity/:id"
export const changeQuantity = catchAsync(async(req: Request,res: Response) => {
    const id = req.params.id
    const quantity = req.body.quantity
    const stock = await StockService.changeQuantityById(id,quantity)
    res.status(200).json({message: "Updated quantity successfully", stock})
})

//[POST] "/admin/stocks/add"
export const addStock = catchAsync(async (req: Request, res: Response) => {
    const body = req.body
    const stock = await StockService.addStock(body);
    res.status(201).json({message: "Added stock successfully", stock})
})

//[PATCH] "/admin/stocks/delete/:id"
export const deleteStock = catchAsync(async (req: Request,res: Response) => {
    const id = req.params.id;
    const stock = await StockService.deleteStockById(id);
    res.status(200).json({message: "Stock marked as deleted successfully", stock})
})

//[PATCH] "/admin/stocks/edit/:id"
export const editStock = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const value = req.body
    const stock = await StockService.editStockById(id,value)
    res.status(200).json({message: "Stock updated successfully", stock})
})

