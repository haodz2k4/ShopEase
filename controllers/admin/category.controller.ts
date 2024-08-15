import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { pick } from "../../utils/pick";
//helper 
import paginate from "../../helpers/paginate.helper";
//services 
import * as CategoryService from "../../services/category.services";
import { model } from "mongoose";
//[GET] "/admin/categories"
export const index = catchAsync(async (req: Request, res: Response): Promise<void> => {

    const filter = pick(req.query,["status","title"])
    const sort = pick(req.query,["sortKey","sortValue"]);
    const page = parseInt(req.query.page as string) | 1
    const limit = parseInt(req.query.page as string) | 15
    const paginations = await paginate(model('category'),filter,{page, limit});
    const selectField = "-deleted -slug"
    const categories = await CategoryService.getCategoriesByQuery(filter, sort,paginations,selectField);
    res.json({categories, paginations})
})

//[GET] "/admin/detail/:id"
export const detail = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    const category = await CategoryService.getCategoryById(id);
    res.json({category})
})