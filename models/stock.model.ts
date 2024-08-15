import { Schema, model } from "mongoose";

export interface IStock {
    product_id: Schema.Types.ObjectId
    supplier_id:  Schema.Types.ObjectId
    wareHouse_id: Schema.Types.ObjectId
    quantity: number,
    warehouseLocation: String,
    deleted:boolean
}
const stockSchema = new Schema<IStock>({
    product_id: {type: Schema.Types.ObjectId, ref: "product", required: true},
    supplier_id: {type: Schema.Types.ObjectId, ref: "supplier", required: true},
    wareHouse_id: {type: Schema.Types.ObjectId, ref: "wareHouse", required: true},
    quantity: {type: Number, min: 0, required: true},
    deleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

export default model<IStock>("stock",stockSchema)