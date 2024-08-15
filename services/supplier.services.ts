import Supplier, {ISupplier} from './../models/supplier.model';

export const getSuppliers = async ():Promise<ISupplier[]> => {
    const suppliers = await Supplier.find({deleted: false});
    return suppliers
}