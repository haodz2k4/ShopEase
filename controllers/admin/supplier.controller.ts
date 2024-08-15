import {Request, Response} from "express";
import { catchAsync } from "../../utils/catchAsync";
import { pick } from "../../utils/pick";

//services 
import * as SupplierService from "../../services/supplier.services";
//[GET] "/admin/suppliers"
export const index = catchAsync( async (req: Request,res: Response) :Promise<void> => {

    const suppliers = await SupplierService.getSuppliers()
    res.json({suppliers})
})