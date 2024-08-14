import Product from "../models/product.model";

export const getProductsByQuery = async (filter: Record<string, any>, sort: Record<string, any>,pagination: any,select: string) => {
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