import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import * as OrderService from "../../services/order.services"
//[POST] "/checkout/order"
export const order = catchAsync(async (req: Request, res: Response) => {
    const user = res.locals.user 
    const userInfo = {
        user_id: user.id,
        phone: user.phone,
        email: user.email,
        address: user.address[user.defaultAddress]
        
    }
    const body = req.body 
    const order = await OrderService.addOrder({userInfo, products: body})
    res.status(201).json({message: "Payment successful",order})
}) 

//[GET] "/checkout/success/:id"
export const checkoutSuccess = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id 
    const order = await OrderService.getOrderById(id)
    res.status(200).json({message: "Order successful", order})
})