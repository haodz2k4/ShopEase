import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync"; 
import { pick } from "../../utils/pick";
import paginate from "../../helpers/paginate.helper";
import * as OrderService from "../../services/order.services"
//[GET] "/admin/orders"
export const index = catchAsync(async (req: Request, res: Response) => { 
    const sort = pick(req.query,["sortKey","sortValue"]) 

    const totalDocument = await OrderService.getTotalOrder() 

    const page = parseInt(req.query.page as string) || 1 
    const limit = parseInt(req.query.limit as string) || 30
    const pagination = paginate(totalDocument,{page, limit})
    const orders = await OrderService.getOrdersByQuery(sort, pagination)
    res.status(200).json({orders, pagination})
}) 

//[GET] "/admin/orders/detail/:id"
export const detail = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id 
    const order = await OrderService.getOrderById(id)
    res.json({order})
})