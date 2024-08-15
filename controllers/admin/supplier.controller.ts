import {Request, Response} from "express";
import { catchAsync } from "../../utils/catchAsync";
import { pick } from "../../utils/pick";
import paginate from "../../helpers/paginate.helper";
//services 
import * as SupplierService from "../../services/supplier.services";
import { model } from "mongoose";
//[GET] "/admin/suppliers"
export const index = catchAsync( async (req: Request,res: Response) :Promise<void> => {
    const filter = pick(req.query,["name","status"])
    const page = parseInt(req.query.page as string) | 1
    const limit = parseInt(req.query.limit as string) | 10
    const pagination = paginate(model('suppliers'),filter,{page, limit})
    const suppliers = await SupplierService.getSuppliers(filter,pagination)
    res.json({suppliers})
})

//[POST] "/admin/suplliers/create"
export const create = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const body = req.body;

    const suppplier = await SupplierService.createSupplier(body);
    res.status(201).json({message: "Created supplier successfully", suppplier})
}) 

//[PATCH] "/admin/suppliers/edit/:id"
export const edit =catchAsync(async (req: Request, res: Response) :Promise<void> => {
    const id = req.params.id 
    const body = req.body
    const supplier = await SupplierService.editSupplierById(id, body);
    res.status(200).json({message: "Supplier updated successfully",supplier})

})

//[PATCH] "/admin/suppliers/delete/:id"
export const deleteSupplier = catchAsync(async (req: Request, res: Response) :Promise<void> => {
    const id = req.params.index
    const supplier = await SupplierService.deleteSupplierById(id);
    res.status(200).json({message: "Supplier marked as deleted successfully",supplier})
})