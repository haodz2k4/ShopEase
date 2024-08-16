import { Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt"

export interface IAccount {
    fullName: string,
    description: string,
    avatar: string,
    email: string,
    password: string,
    phone: string,
    role_id: Schema.Types.ObjectId,
    birthDate: Date
    deleted: boolean,
    status: "active" | "inactive"
}

interface IAccountMethods {
    isPasswordMatch(password: string): Promise<boolean>
}

interface AccountModel extends Model<IAccount,{}, IAccountMethods> {
    isEmailExists(email: string, excludeAccountId?: Schema.Types.ObjectId): Promise<boolean>
}



const accountSchema = new Schema<IAccount, AccountModel,IAccountMethods>({
    fullName: {type: String, required: true, min: 3, max: 20},
    description: String,
    avatar: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    role_id: {type: Schema.Types.ObjectId, required: true, ref: 'role'},
    birthDate: Date,
    deleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["active","inactive"],
        default: "active"
    }
},{timestamps: true})

accountSchema.statics.isEmailExists = async function(email: string, excludeAccountId?: Schema.Types.ObjectId):Promise<boolean> {
    const account = await this.exists({email, _id: { $ne: excludeAccountId }})
    return !!account
}

accountSchema.methods.isPasswordMatch = async function (password: string):Promise<boolean> {
    return bcrypt.compare(password, this.password);
  };

accountSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }

    next()
})

export default model<IAccount,AccountModel>("account",accountSchema)