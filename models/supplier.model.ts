import { Schema, model } from "mongoose";
interface contactInfo {
    email: string
    phone: string 
    address: string 
}
export interface ISupplier {
    name: string,
    contactInfo: contactInfo,
    deleted: boolean,
    status: "active" | "inactive"
}
const supplierSchema = new Schema<ISupplier>({
    name: {type: String, required: true},
    contactInfo: {
        email: {type: String , required: true},
        phone: {type: String , required: true},
        address: {type: String , required: true}
    },
    status: {
        type: String,
        enum: ["active","inactive"],
        default: "active"
    },
    deleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

export default model<ISupplier>("supplier",supplierSchema)