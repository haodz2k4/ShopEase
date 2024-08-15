import Stock, { IStock } from "../models/stock.model"
import ApiError from "../utils/ApiError"

export const getStocksByQuery = async (
        productsFilter : Record<string,any>, 
        stocksFilter: Record<string, any>,
        pagination: any
    ) :Promise<IStock[]>=> { 


    if(productsFilter.title){
        productsFilter.title = new RegExp(productsFilter.title,"i")
    }
    if(stocksFilter.name){
        stocksFilter.name = new RegExp(stocksFilter.name,"i")
    }
    const stock = await Stock.find({deleted: false})
    .populate({
        path: "product_id",
        match: {
            ...productsFilter,
            deleted: false
        },
        select: "title thumbnail price discountPercentage"
    })
    .populate({
        path: "supplier_id",
        match: {
            ...stocksFilter,
            deleted: false
        },
        select: "name contactInfo"
    })
    .populate({
        path: "wareHouse_id",
        match: {
            deleted: false
        },
        select: "name"
    })
    .skip(pagination.skip)
    .limit(pagination.limit)
    .sort({createdAt: "desc"})
    const filterStock = await stock.filter(item => item.product_id && item.supplier_id)
    return filterStock
}

export const getStockById = async (id: string) :Promise<IStock> => {
    const stock = await Stock
        .findOne({_id: id, deleted: false})
        .populate({
            path: "product_id",
            match: {
                deleted: false
            },
            select: "title thumbnail price discountPercentage"
        })
        .populate({
            path: "supplier_id",
            match: {
                deleted: false
            },
            select: "name contactInfo"
        })
        .populate({
            path: "wareHouse_id",
            match: {
                deleted: false
            },
            select: "name address"
        })
    if(!stock){
        throw new ApiError(404,"Stock is not found")
    }
    return stock

}

export const changeQuantityById = async (id: string, quantity: number) :Promise<IStock> => {
    const stock = await Stock.findByIdAndUpdate(
        id,
        {quantity},
        {new: true, runValidators: true}
    ).select("quantity")
    if(!stock){
        throw new ApiError(404,"Stocks is not found")
    }
    return stock
}

export const addStock = async (value: IStock) :Promise<IStock> => {
    const stock = await Stock.create(value)

    return stock 
}

export const deleteStockById = async (id: string) :Promise<IStock> => {
    const stock = await Stock.findByIdAndUpdate(
        id,
        {deleted: true},
        {new: true, runValidators: true}
    ).select("deleted");

    if(!stock){
        throw new ApiError(404,"Stock is not found")
    }
    return  stock
}

export const editStockById = async (id: string, value: IStock) => {
    const stock = await Stock.findByIdAndUpdate(id, value);
    return stock
}