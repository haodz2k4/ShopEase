import Order from "../models/order.model"
import ApiError from "../utils/ApiError";

export const getOrderByQuery = () => {

}

export const getOrderById = async (id: string) => {
    const order = await Order.findById(id);
    if(!order){
        throw new ApiError(400,"Order not found")
    }
    return order
}

export const getOrderByUserId = async (user_id: string) => {
    const order = await Order.find({'userInfo.user_id': user_id})
    if(!order){
        throw new ApiError(400,"Order not found")
    }
    return order

} 

export const addOrder = async (bodyOrder: Record<string, any>) => {
    return await Order.create(bodyOrder)
}
