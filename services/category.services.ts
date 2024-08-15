import Category from "../models/category.model";

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