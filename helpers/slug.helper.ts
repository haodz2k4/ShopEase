import { Model } from "mongoose";
import slugify from "slugify";
export const createUniqueSlug = async (slug: string, model: Model<any>) => {
    let counts = 1
    while(await model.exists({slug})) {
        slug += `-${counts}`
        counts++
    }
    return slug
    
}

export const createSlug = (string: string) => {
    return slugify(string, {lower: true, strict: true})
}