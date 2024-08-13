import { Schema, model } from 'mongoose'; 
export interface IProduct {
    _id: Schema.Types.ObjectId,
    title: string,
    category_id: Schema.Types.ObjectId,
    description: string,
    highlighted: "0" | "1",
    thumbnail: string,
    price: number,
    discountPercentage: number,
    deleted: boolean,
    position: number,
    slug: string,
    status: ("active" | "inactive"),
    
}
const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true,
        min: 3,
        max: 10 
    },
    category_id: { type: Schema.Types.ObjectId, ref: 'category' },
    description: String,
    thumbnail: String,
    price: {
        type: Number,
        min: [0, 'Price cannot be negative'],
        required: true
    },
    discountPercentage: {
        type: Number,
        min: [0, 'Discount percentage cannot be negative'],
        max: [100, 'Maximum discount percentage is 100'],
        required: true
    },
    deleted: {
        type: Boolean,
        default: false,
    },
    highlighted: {
        type: String,
        enum: ["0", "1"],
        default: "0" 
    },
    position: {
        type: Number,
        min: [0, 'Position cannot be negative']
    },
    slug: {
        type: String,
        unique: true
    },
    status: {
        type: String,
        default: "active",
        enum: ["active", "inactive"]
    }
}, {
    timestamps: true
}) 

export default model<IProduct>("product",productSchema)