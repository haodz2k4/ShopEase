import WareHouse from "../models/warehouse.model";

export const getWareHousesByQuery = async () => {
    const wareHouses = await WareHouse.find({deleted: false})
    return wareHouses
}