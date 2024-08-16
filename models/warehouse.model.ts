import { model, Schema } from "mongoose";
export interface IWareHouse {
    name: string,
    address: {
        city: string,
        street: string,
        district: string
    },
    phone: string,
    email: string,
}

const wareHouseSchema = new Schema<IWareHouse>({
    name: {type: String, required: true, minlength: 5, maxlength: 50},
    address: {
        city: {type: String, required: true},
        street: {type: String, required: true},
        district: {type: String, required: true}
    },
    phone: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
},{timestamps: true})

export default model("wareHouse",wareHouseSchema)