import WareHouse,{IWareHouse} from "../models/warehouse.model";
import ApiError from "../utils/ApiError";

export const getWareHousesByQuery = async (filter: Record<string,any>) => {

    //search
    if(filter.name){
        filter.name = new RegExp(filter.name,"i")
    }
    const wareHouses = await WareHouse.find(filter)
    return wareHouses
}

export const getWareHouse = async (id: string) :Promise<IWareHouse> => {
    const wareHouse = await WareHouse.findOne({_id: id, deleted: false})
    if(!wareHouse){
        throw new ApiError(404,"WareHouse is not found")
    }
    return wareHouse
}

export const editWareHouseById = async (id: string, value: IWareHouse) :Promise<IWareHouse> => {
    const wareHouse = await WareHouse.findByIdAndUpdate(id, value,{new: true, runValidators: true});
    if(!wareHouse){
        throw new ApiError(404,"WareHouse is not found")
    }
    return wareHouse
}

export const createWareHouse = async (body: IWareHouse):Promise<IWareHouse> => {
    
    if(await WareHouse.isExistsEmail(body.email)){
        throw new ApiError(404, "Email already exists")
    }
    return await WareHouse.create(body)
}

export const deleteWareHouseById = async (id: string) :Promise<IWareHouse> => {
    const wareHouse = await WareHouse.findByIdAndUpdate(id, {deleted: true},{new: true}).select("deleted")
    if(!wareHouse){
        throw new ApiError(404,"WaerHouse is not found")
    }
    return wareHouse
}