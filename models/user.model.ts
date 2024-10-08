import bcrypt from 'bcrypt';
import { Schema,model, Model } from "mongoose";
import Cart from "../models/cart.model"
interface IUser {
    _id: Schema.Types.ObjectId
    userName: string,
    firstName: string,
    lastName: string,
    avatar: string,
    email: string,
    password: string,
    phone: string,
    birthDate: Date,
    address: [{
        city: string,
        street: string,
        district: string 
    }],
    favoriteList: Schema.Types.ObjectId[],
    defaultAddress: number,
    gender: "nam" | "nữ",
    status: "active" | "inactive",
    deleted: boolean
}

interface IUserMethod {
    isPassworMatch(password: string) :Promise<boolean>
}

interface UserModel extends Model<IUser,{},IUserMethod> {
    isEmailExists(email: string) :Promise<boolean>
}


const userSchema = new Schema<IUser,UserModel,IUserMethod>({
    userName: {type: String, required: true, unique: true, minlength: 3, maxlength: 30},
    firstName: {type: String, required: true,minlength: 1, maxlength: 20},
    lastName: {type: String, required: true,minlength: 1, maxlength: 20},
    email: {type: String, required: true,minlength: 6, maxlength: 50, unique: true},
    avatar: String,
    password: {type: String, required: true,minlength: 8 },
    phone: {type: String, required: true,minlength: 8, maxlength: 10},
    birthDate: {type: Date, required: true},
    address: [{
            city: {type: String},
            street: {type: String},
            district: {type: String} 
        }
    ],
    defaultAddress: {
        type: Number,
        default: 0
    },
    favoriteList: [{ type: Schema.Types.ObjectId, ref: 'Product', default: []}],
    gender: {type: String, enum: ["nam","nữ"]},
    status: {type: String, enum: ["active","inactive"]},
    deleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true})

userSchema.statics.isEmailExists = async function (email: string) :Promise<boolean> {
    const isExists = await this.findOne({email});
    return !!isExists
}

userSchema.methods.isPassworMatch = async function(password: string) :Promise<boolean> {
    return await bcrypt.compare(password,this.password)
}

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
}) 
userSchema.post('save',async function(doc) {
    try {
        await Cart.create({user_id: doc._id})
    } catch (error) {
        console.error("Error creating cart", error)
    }
})



export default model<IUser,UserModel>("user",userSchema)