import ApiError from '../utils/ApiError';
import Supplier, {ISupplier} from './../models/supplier.model';

export const getSuppliers = async (filter: Record<string,any>,pagination: any):Promise<ISupplier[]> => {
    const suppliers = await Supplier
        .find(filter)
        .limit(pagination.limit)
        .skip(pagination.skip);
    return suppliers
}

export const createSupplier = async (value: ISupplier):Promise<ISupplier> => {
    return await Supplier.create(value)
}

export const editSupplierById = async (id: string, value: ISupplier):Promise<ISupplier> => {
    const supplier = await Supplier.findByIdAndUpdate(id, value);
    if(!supplier){
        throw new ApiError(404,"Suplliers is not found")
    }
    return supplier
}

export const deleteSupplierById = async (id: string):Promise<ISupplier> => {
    const supplier = await Supplier.findByIdAndUpdate(id,{deleted: true})
    .select("deleted")
    if(!supplier){
        throw new ApiError(404,"Suplliers is not found")
    }
    return supplier
}