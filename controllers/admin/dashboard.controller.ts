import {Request, Response} from "express"
import { catchAsync } from "../../utils/catchAsync"
import { pick } from "../../utils/pick"
import * as Date from "../../utils/date"
//service 
import { getTotalAccountByQuery } from "../../services/account.services"
//statistic [users,orders,products/category]

//[GET] "/admin/dashboards"
export const index = catchAsync(async (req: Request, res: Response) => {
    //example: statistic=day 
    const rangeDate: Record<string,{$gte: Date, $lte: Date}> = {}
    const statistic = req.query.statistic  
    switch(statistic){
        case 'day':
            rangeDate.createAt = Date.getTimeOfDay()
            break; 
        case 'week': 
            rangeDate.createdAt = Date.getTimeOfWeek();
            break; 
        case 'month':
            rangeDate.createdAt = Date.getTimeOfMonth(); 
            break;
        case 'year': 
            rangeDate.createdAt = Date.getTimeOfYear();
            break;
    } 
    const statistical = {
        account: {
            total: await getTotalAccountByQuery({...rangeDate}),
            active: await getTotalAccountByQuery({status: "active", ...rangeDate}),
            inactive: await getTotalAccountByQuery({status: "inactive", ...rangeDate})
        }
    }
    //week, day month, year 
    res.status(200).json({message: "Nothing",statistical})
})