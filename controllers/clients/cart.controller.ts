import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import * as CartService from "../../services/cart.services"
//[GET] "/cart"
export const index = catchAsync(async (req: Request, res: Response) => {
    const userId = res.locals.user.id
    const cart = await CartService.getCartByUserId(userId)
    
    res.json({cart})
}) 

//[POST] "/cart/add/:product_id"
export const add = catchAsync(async (req: Request, res: Response) => {
    const userId = res.locals.user.id
    const product_id = req.params.product_id 
    const quantity = req.body.quantity 
    const cart = await CartService.addCartByUserId(userId,product_id,quantity)
    
    res.status(201).json({message: "Added product to cart successfully", cart})
}) 

//[post] "/cart/change-quantity/:product_id"
export const changeQuantity = catchAsync(async (req: Request, res: Response) => {
    const userId = res.locals.user.id
    const product_id = req.params.product_id 
    const quantity = req.body.quantity  
    const cart = await CartService.updateCart(userId,product_id,quantity)
    res.status(200).json({message: "Updated quantity successfully", cart})
})