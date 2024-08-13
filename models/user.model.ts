import { Schema,model } from "mongoose";

interface IUser {
    _id: Schema.Types.ObjectId
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    birthDate: Date,
    address: [{
        city: string,
        street: string,
        district: string 
    }],
    favoriteList: string[],
    defaultAddress: number,
    slug: string,
    gender: "nam" | "nữ",
    status: "active" | "inactive",
    deleted: boolean
}
const userSchema = new Schema<IUser>({
    userName: {type: String, required: true, unique: true, minlength: 3, maxlength: 30},
    firstName: {type: String, required: true,minlength: 1, maxlength: 20},
    lastName: {type: String, required: true,minlength: 1, maxlength: 20},
    email: {type: String, required: true,minlength: 6, maxlength: 50, unique: true},
    password: {type: String, required: true,minlength: 8 },
    phone: {type: String, required: true,minlength: 8, maxlength: 10},
    birthDate: {type: Date, required: true},
    address: [{
        city: {type: String, required: true},
        street: {type: String, required: true},
        district: {type: String, required: true} 
    }],
    defaultAddress: {
        type: Number,
        default: 0
    },
    favoriteList: {type: [String], default: []},
    slug: {type: String, unique: true},
    gender: {type: String, enum: ["nam","nữ"]},
    status: {type: String, enum: ["active","inactive"]},
    deleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

export default model<IUser>("users",userSchema)