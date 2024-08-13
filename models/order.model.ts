import { Schema, model } from "mongoose";

interface IProduct {
    product_id: Schema.Types.ObjectId,
    price: number,
    discountPercentage: number,
    quantity: number,
}
interface IOrder {
    userInfo: {
        user_id: string,
        phone: string,
        email:string,
        address: {
            city: string,
            street: string,
            district: string 
        }
    },
    products: IProduct[],
}

const orderSchema = new Schema<IOrder>({
    userInfo: {
        user_id: {type: String, required: true, ref: 'user'},
        phone: {type: String, required: true},
        email: {type: String, required: true},
        address: {
            city: {type: String, required: true},
            street: {type: String, required: true},
            district: {type: String, required: true} 
        }
    },
    products: [
        {
            product_id: {type: Schema.Types.ObjectId, required: true, ref: 'product'},
            price: {type: Number, min: [0,"Price cannot be negative"], required: true},
            discountPercentage: {
                type: Number,
                min: [0, 'Discount percentage cannot be negative'],
                max: [100, 'Maximum discount percentage is 100'],
                required: true
            },
            quantity: {type: Number, min: [1,"Minimum quantity is 1"]}
        }
    ]
},{timestamps: true})

export default model<IOrder>("order",orderSchema)