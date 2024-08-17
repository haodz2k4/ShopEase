
import Role from "../models/role.model";
import ApiError from "../utils/ApiError";

export const getRolesByQuery = async (filter: Record<string,any>) => {

    const roles = await Role.find({...filter, deleted: false});
    return roles

}

export const createRole = async (value: Record<string, any>)  => {
    return await Role.create(value)
}

export const editRole = async (id: string, value: Record<string, any>)  => {
    const role = await Role.findByIdAndUpdate(id, value);
    if(!role){
        throw new ApiError(404,"role is not found")
    }
    return role 
}

export const deleteRole = async (id: string) => {
    const role = await Role.findByIdAndUpdate(id, {deleted: true}).select("deleted");
    if(!role){
        throw new ApiError(404,"role is not found")
    }
    return role 
}