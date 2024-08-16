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

    const totalDocument = await CategoryService.getTotalCategoryByQuery(filter)
    const paginations = paginate(totalDocument,{page, limit});
    const selectField = "-deleted -slug"
    const categories = await CategoryService.getCategoriesByQuery(filter, sort,paginations,selectField);
    res.json({categories, paginations})
})

//[GET] "/admin/categories/detail/:id"
export const detail = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    const category = await CategoryService.getCategoryById(id);
    res.json({category})
})

//[POST] "/admin/categories/create"
export const create = catchAsync(async (req: Request, res: Response):Promise<void> => {
    const body = req.body;
    const category = await CategoryService.createCategory(body);
    res.status(201).json({message: "Added Category successfully", category})
}) 

//[PATCH] "/admin/categories/edit/:id"
export const edit = catchAsync(async (req: Request, res: Response) :Promise<void> => {
    const id = req.params.id;
    const body = req.body
    const category = await CategoryService.updateCategoryById(id,body)

    res.status(200).json({message: "updated category successfully", category})
})

//[PATCH] "/admin/categories/delete/:id"
export const deleteCategory = catchAsync(async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id
    const category = await CategoryService.deleteCategoryById(id);
    res.status(200).json({message: "Deleted category successfullly", category})

})