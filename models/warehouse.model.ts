import { Model, model, Schema } from "mongoose";
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

interface WareHouseModel extends Model<IWareHouse> {
    isExistsEmail(email: string) : Promise<boolean>
}

const wareHouseSchema = new Schema<IWareHouse,WareHouseModel>({
    name: {type: String, required: true, minlength: 5, maxlength: 50},
    address: {
        city: {type: String, required: true},
        street: {type: String, required: true},
        district: {type: String, required: true}
    },
    phone: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
},{timestamps: true}) 

wareHouseSchema.statics.isExistsEmail = async function(email: string): Promise<boolean> {
    const wareHouse = await this.findOne({email});
    return !!wareHouse
}

export default model<IWareHouse, WareHouseModel>("wareHouse",wareHouseSchema)