import bcrypt from 'bcrypt';
import { Schema,model, Model } from "mongoose";
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

interface UserModel extends Model<IUser> {
    isEmailExists(email: string) :Promise<boolean>
}

const userSchema = new Schema<IUser,UserModel>({
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

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

export default model<IUser,UserModel>("user",userSchema)