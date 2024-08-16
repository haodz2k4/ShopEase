import { Schema, model } from "mongoose";
export interface IAccount {
    fullName: string,
    description: string,
    avatar: string,
    email: string,
    password: string,
    phone: string,
    role_id: Schema.Types.ObjectId,
    birthDate: Date
}

const accountSchema = new Schema<IAccount>({
    fullName: {type: String, required: true, min: 3, max: 20},
    description: String,
    avatar: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    role_id: {type: Schema.Types.ObjectId, required: true, ref: 'RoleV2'},
    birthDate: Date
},{timestamps: true})

export default model<IAccount>("account",accountSchema)