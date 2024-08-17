import {Request, Response} from "express"
import { catchAsync } from "../../utils/catchAsync"

//[GET] "/admin/dashboards"
export const index = catchAsync(async (req: Request, res: Response) => {

    res.status(200).json({message: "Nothing"})
})