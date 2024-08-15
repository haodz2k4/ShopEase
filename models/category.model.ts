import {Schema, model} from "mongoose";
import { createSlug, createUniqueSlug } from "../helpers/slug.helper";
export interface ICategory {
    title: string,
    thumbnail: string,
    description: string,
    status: string,
    deleted: boolean,   
    slug: string,
    parent_category: Schema.Types.ObjectId
}

const categorySchema = new Schema<ICategory>({
    title: {type: String, required: true, unique: true, minlength: 3, maxlength: 200},
    thumbnail: String,
    description: String ,
    deleted: {
        type: Boolean,
        default: false 
    },
    status: {
        type: String,
        enum: ["active","inactive"],
        default: "active"
    },
    slug: {
        type: String,
        unique: true
    },
    parent_category: {type: Schema.Types.ObjectId, ref: 'category'} 
}, {timestamps: true})
 
categorySchema.pre('save',async function(next) {
    if(this.isModified('title')){
        const initSlug = createSlug(this.title)
        this.slug = await createUniqueSlug(initSlug,model('category'))
    }
    next()
})

export default model<ICategory>("category",categorySchema)