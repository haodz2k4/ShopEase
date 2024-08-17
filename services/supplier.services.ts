import ApiError from '../utils/ApiError';
import Supplier from './../models/supplier.model';

export const getSuppliers = async (filter: Record<string,any>,pagination: Record<"limit"| "skip",number>) => {
    const suppliers = await Supplier
        .find(filter)
        .limit(pagination.limit)
        .skip(pagination.skip);
    return suppliers
}

export const getTotalSupplierByQuery = async (filter: Record<string, any>) :Promise<number> => {
    return await Supplier.countDocuments(filter)
}

export const createSupplier = async (value: Record<string, any>) => {
    return await Supplier.create(value)
}

export const editSupplierById = async (id: string, value: Record<string, any>)=> {
    const supplier = await Supplier.findByIdAndUpdate(id, value);
    if(!supplier){
        throw new ApiError(404,"Suplliers is not found")
    }
    return supplier
}

export const deleteSupplierById = async (id: string) => {
    const supplier = await Supplier.findByIdAndUpdate(id,{deleted: true})
    .select("deleted")
    if(!supplier){
        throw new ApiError(404,"Suplliers is not found")
    }
    return supplier
}