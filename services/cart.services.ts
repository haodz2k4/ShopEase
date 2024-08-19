import Cart from "../models/cart.model"
import ApiError from "../utils/ApiError"


export const getCartByUserId = async (user_id: string) => {
    const cart = await Cart.findOne({user_id}).populate('products.product_id','title thumbnail price discountPercentage slug')
    if(!cart){
        throw new ApiError(404,"Cart is not found")
    }
    return cart
} 

export const addCartByUserId = async (user_id: string, product_id: string, quantity: number) => {
    let cart = await Cart.findOneAndUpdate(
        {user_id, 'products.product_id': product_id},
        {$inc: {'products.$.quantity':quantity}},
        {new: true}
    )

    if(!cart){
        cart = await Cart.findOneAndUpdate(
            {user_id},
            {products: {$push: {product_id, quantity}}},
            {new: true}
        )
    }

    if(!cart){
        throw new ApiError(404,"Cart is not found")
    }
    return cart
};

export const updateCart = async (user_id: string, product_id: string, quantity: number) => {
    const cart = await Cart.findOneAndUpdate(
        {user_id, 'products.product_id': product_id},
        {'products.$.quantity': quantity},
        {new: true}
    )
    if(!cart){
        throw new ApiError(404,"Product is not found")
    }
    return cart
}
