import Product,{IProduct} from "../models/product.model";
import ApiError from "../utils/ApiError";

export const getProductsByQuery = async (filter: Record<string, any>, sort: Record<string, any>,pagination: any,select: string) :Promise<IProduct[]> => {
    const sortOption: Record<string, any> = {};
    if (sort.sortKey && sort.sortValue) {
        sortOption[sort.sortKey] = sort.sortValue === 'desc' ? -1 : 1;
    }
    const products = await Product
        .find({ ...filter, deleted: false })
        .sort(sortOption)
        .limit(pagination.limit)
        .skip(pagination.skip)
        .select(select)
    return products;
}

export const getProductById = async (id: string) :Promise<IProduct> => {
    const product = await Product.findOne({_id: id, deleted: false})
    if(!product){
        throw new ApiError(404,"Không tìm thấy sản phẩm tương ứng")
    }
    return product
}

export const getProductBySlug = async (slug: string) :Promise<IProduct> => {
    const product = await Product.findOne({slug, deleted: false, status: "active"})
    if(!product){
        throw new ApiError(404,"Không tìm thấy sản phẩm tương ứng")
    }
    return product
}