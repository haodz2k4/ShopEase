import {Request, Response, NextFunction} from "express";
import { Model } from "mongoose";

export default (model: Model<any>, limit: number) => { 

    return async (req: Request, res: Response, next: NextFunction): Promise<void>  => {
        try {
            const ObjPages = {
                currentPage: 1,
                limit: limit,
                skip: 0,
                countPages: 0
            }
            const pages = req.query.pages 
            if(typeof pages === "string"){
                ObjPages.currentPage = parseInt(pages)
            }
            
            const countDocument = await model.countDocuments();
            ObjPages.countPages = Math.ceil(countDocument / limit)
            ObjPages.skip = (ObjPages.currentPage - 1) * limit
            res.locals.pagination = ObjPages
            next()
        } catch (error) {
            next(error)
        }

         
    }

}
