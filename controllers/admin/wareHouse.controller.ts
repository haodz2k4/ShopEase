import {NextFunction, Request, Response} from "express";
import { catchAsync } from "../../utils/catchAsync";
import { pick } from "../../utils/pick";

//services 
import * as wareHouseService from "../../services/wareHouse.services";
//[GET] "/admin/ware-houses"
export const index = catchAsync( async (req: Request,res: Response) :Promise<void> => {
    const filter = pick(req.query,["name"])
    const wareHouses = await wareHouseService.getWareHousesByQuery(filter)
    res.json({wareHouses})
})

//[GET] "/admin/ware-houses/detail/:id"
export const detail = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id 
    const wareHouse = await wareHouseService.getWareHouse(id);
    res.status(200).json({wareHouse})
})

//[PATCH] "/admin/ware-houses/edit/:id"
export const edit = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id 
    const body = req.body 

    const wareHouse = await wareHouseService.editWareHouseById(id, body);
    res.status(200).json({message: "Edited warehouse successfully", wareHouse})
})

//[POST] "/admin/ware-house/create"
export const create = catchAsync(async (req: Request, res: Response) => {
    const body = req.body
    const wareHouse = await wareHouseService.createWareHouse(body)
    res.status(201).json({message: "created warehouse successfully", wareHouse})
})

//[PATCH] "/admin/ware-house/delete/:id"
export const deleteWareHouse = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id 
    const wareHouse = await wareHouseService.deleteWareHouseById(id)
    res.status(200).json({message: "Delete warehouse successfully", wareHouse})
})