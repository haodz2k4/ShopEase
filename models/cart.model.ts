import { Schema, model } from "mongoose";

interface ICart {
    user_id: string,
    products: {
        product_id: Schema.Types.ObjectId,
        quantity: number
    }[],

}

const cartSchema = new Schema<ICart>({
    user_id: {type: String, required: true},
    products: [
        {
            product_id: Schema.Types.ObjectId,
            quantity: {type: Number, min: [1,"Minimum quantity is 1"]}
        }
    ]
},{
    timestamps: true
})

export default model<ICart>("cart",cartSchema)