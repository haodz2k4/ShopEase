import Product from "../models/product.model";

export const getProductsByQuery = async () => {
    const products = await Product.find({deleted: false})

    return products
}