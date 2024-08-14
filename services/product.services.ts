import Product,{IProduct} from "../models/product.model";
import ApiError from "../utils/ApiError";
export const getProductsByQuery = async (filter: Record<string, any>, sort: Record<string, any>,pagination: any,select: string) :Promise<IProduct[]> => {
    
    const sortOption: Record<string, any> = {};
    if (sort.sortKey && sort.sortValue) {
        sortOption[sort.sortKey] = sort.sortValue === 'desc' ? -1 : 1;
    }
    //searching
    filter.title = new RegExp(filter.title,"i")
    const products = await Product
        .find({ ...filter, deleted: false })
        .sort(sortOption)
        .limit(pagination.limit)
        .skip(pagination.skip)
        .select(select); 
    return products;    
}

export const getProductById = async (id: string) :Promise<IProduct> => {
    const product = await Product.findOne({_id: id, deleted: false})
    if(!product){
        throw new ApiError(404,"No products found")
    }
    return product
}

export const getProductBySlug = async (slug: string) :Promise<IProduct> => {
    const product = await Product.findOne({slug, deleted: false, status: "active"})
    if(!product){
        throw new ApiError(404,"No products found")
    }
    return product
}

export const changeStatus = async (id: string, status: string) :Promise<IProduct> => {
    const product = await Product
    .findByIdAndUpdate(id,{status: status},{new: true, runValidators: true}).select("status slug")
    if(!product){
        throw new ApiError(404,"No products found")
    }
    return product
}

export const changeMultiDelete = async (ids: string[]) :Promise<any> => {
    const infoUpdate = await Product.updateMany({_id: {$in: ids}}, {deleted: false});
    if(infoUpdate.modifiedCount === 0){
        throw new ApiError(400,"No products have been delete")
    }else if(infoUpdate.modifiedCount !== ids.length){
        throw new ApiError(400,"Unable to delete all products")
    }
    return infoUpdate
}

export const changeMultiStatus = async (ids: string[], status: string) => {
    const products = await Promise.all(
        ids.map(item => Product
            .findByIdAndUpdate(item,{status},{runValidators: true, new: true})
            .select("status")
        )
            
    )
    if(products.length === 0){
        throw new ApiError(400,"No products have been change status")
    }else if(products.length !== ids.length){
        throw new ApiError(400,"Unable to change status all products")
    }
    return products
} 

export const changeMultiPosition = async (ids: {id: string, position: number}[]) => {
    const products = await Promise.all(
        ids.map(item => Product
            .findByIdAndUpdate(item.id,{position: item.position},{runValidators: true, new: true})
            .select("position")

        )
    );
    if(products.length === 0){
        throw new ApiError(400,"No products have been change position")
    }else if(products.length !== ids.length){
        throw new ApiError(400,"Unable to change position all products")
    }
    return products
}