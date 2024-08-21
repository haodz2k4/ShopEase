import Order from "../models/order.model"
import ApiError from "../utils/ApiError";

export const getOrdersByQuery = async (sort: Record<string, any>, pagination: Record<"limit"|"skip",number>) => {

    const sortOption: Record<string, any> = {};
    if (sort.sortKey && sort.sortValue) {
        sortOption[sort.sortKey] = sort.sortValue === 'desc' ? -1 : 1;
    }
    return await Order
    .find()
    .sort(sortOption)
    .skip(pagination.skip)
    .limit(pagination.limit)

}

export const getTotalOrder = async (filter?: Record<string, any>) => {
    return await Order.countDocuments(filter)
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

export const getTotalSoldByProductId = async (product_id: any) => {
    const orders = await Order.find({'products.product_id': product_id}).select("products") 
    
    let total = 0
    for(const order of orders){
        for(const product of order.products){
            total += product.quantity
        }
    }
    return total
}