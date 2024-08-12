import {connect} from "mongoose"

export const getConnection =async () => {
    try {
        await connect(process.env.DATABASE_URL as string);
        console.log("connected to database")
    } catch (error) {
        console.log("failed to connect database")
    }
}