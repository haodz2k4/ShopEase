import {Request, Response, NextFunction} from "express"
import { catchAsync } from "../../utils/catchAsync"
import { pick } from "../../utils/pick"
//helpers 
import {rangePrice} from "../../helpers/price.helper";
import paginate from "../../helpers/paginate.helper";
//services
import * as ProductService from "../../services/product.services";
import * as CategoryService from "../../services/category.services";
import { model } from "mongoose";
//[GET] "/products"
export const index = catchAsync(async (req: Request, res: Response) => {
    const listQuery: string[] = ["title"]
    //range price
    const minPrice = parseInt(req.query.minPrice as string) 
    const maxPrice = parseInt(req.query.maxPrice as string)
    if(minPrice && maxPrice){
        listQuery.push("price")
        req.query.price = rangePrice(minPrice, maxPrice)
    } 
    //end range price 

    //filter 
    const filter = pick(req.query,listQuery);
    //pagination
    const page = parseInt(req.query.page as string) | 1
    const limit = parseInt(req.query.limit as string) | 15;
    const pagination = await paginate(model('product'),filter,{page,limit})
    //end pagination 

    //sort 
    const sort = pick(req.query,["sortKey","sortValue"])
    const products = await ProductService.getProductsByQuery(filter,sort,pagination,"title thumbnail price discountPercentage slug")
    console.log(filter)
    res.json({products, pagination})
    
})

//[GET] "/products/:slugCategory"
export const category = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slugCategory;
    const id = await CategoryService.convertSlugToId(slug)
    const filter = pick(req.query,["title"])

    //pagination
    const page = parseInt(req.query.page as string) | 1
    const limit = parseInt(req.query.limit as string) | 15;
    const pagination = await paginate(model('product'),filter,{page,limit})
    //end pagination 
    const fieldSelect = "title thumbnail price discountPercentage slug"
    const products = await ProductService.getProductsByQuery({...filter, category_id: id},{position: 'desc'},pagination,fieldSelect);
    res.json({products, pagination})

})