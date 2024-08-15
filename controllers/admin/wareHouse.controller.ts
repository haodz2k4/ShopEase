import {Request, Response} from "express";
import { catchAsync } from "../../utils/catchAsync";
import { pick } from "../../utils/pick";

//services 
import * as wareHouseService from "../../services/wareHouse.services";
//[GET] "/admin/suppliers"
export const index = catchAsync( async (req: Request,res: Response) :Promise<void> => {

    const wareHouses = await wareHouseService.getWareHousesByQuery()
    res.json({wareHouses})
})