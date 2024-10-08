import { catchAsync } from './../../utils/catchAsync';
import { Request, Response} from "express"
//services 
import * as UserService from "../../services/user.services";
import ApiError from "../../utils/ApiError";

//[GET] "/users/profiles"
export const profile = catchAsync(async (req: Request, res: Response) => {
    const user = res.locals.user 
    res.status(200).json({user})
}) 

//[POST] "/users/profiles/add-address"
export const addAdress = catchAsync(async (req: Request, res: Response) => {
    const {city,street,district} = req.body
    const user = res.locals.user 
    user.address = user.address.push({city, street, district})
    const updateUser = await UserService.updateUserById(user.id, {address: user.address})
    res.status(201).json({message: "Address added successfully", user: updateUser})
})  

//[PATCH] "/users/profiles/update"
export const update = catchAsync(async (req: Request, res: Response) => {
    const user_id = res.locals.user.id
    const bodyUser = req.body 
    const user = await UserService.updateUserById(user_id, bodyUser)
    res.status(200).json({message: "Updated user successfully", user})
}) 

//[PATCH] "/users/profiles/change-avatar"
export const changeAvatar = catchAsync(async (req: Request, res: Response) => {
    const user_id = res.locals.user.id 
    const avatar = req.body.avatar  
    const user = await UserService.updateUserById(user_id, {avatar})
    res.status(200).json({message: "Changed avatar successfully", avatar: user.avatar})
}) 

//[POST] "/users/profiles/favorite-list/add/:product_id"
export const addFavoriteList = catchAsync(async (req: Request, res: Response) => {
    const product_id = req.params.product_id 
    const userId = res.locals.user.id 
    const favoriteList = await UserService.addFavoriteListByUserId(userId, product_id) 
    if(!favoriteList){
        throw new ApiError(404, "User is not found")
    }
    res.status(201).json({message: "Added address successfully", favoriteList})
    
})

//[DELETE] "/users/profiles/favorite-list/delete/:product_id"   
export const deleteFavoriteList =catchAsync(async (req: Request, res: Response) => {
    const product_id = req.params.product_id 
    const userId = res.locals.user.id
    const user = await UserService.deleteFavoriteListByUserId(userId,product_id)
    if(!user){
        throw new ApiError(404, "User is not found")
    }
    res.status(200).json({message: "Remove favorite list successfully", user})
})