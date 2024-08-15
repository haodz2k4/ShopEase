import Category from "../models/category.model";
import ApiError from "../utils/ApiError";

export const getCategoriesByQuery = async (
     filter: Record<string, any>,
     sort: Record<string, any>,
     pagination: {limit: number, skip: number},
     select: string
    ) => { 

    if(sort.sortKey && sort.sortValue){
        sort[sort.sortKey] 
    }
    const category = await Category
    .find({...filter, deleted: false})
    .sort(sort)
    .limit(pagination.limit)
    .skip(pagination.skip)
    .select(select)
    return category
}

export const convertSlugToId = async (slug: string) :Promise<string> => {
    const category = await Category.findOne({slug}).select("id")
    if(!category){
      throw new ApiError(404,"Category is not found")
    }
    return category.id
}