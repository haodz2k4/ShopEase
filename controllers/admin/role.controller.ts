
import {Request, Response} from "express";
import { catchAsync } from "../../utils/catchAsync";
import { pick } from "../../utils/pick";

import * as RoleService from "../../services/role.services";
//[GET] "/admin/roles"
export const index = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query,["title"])
    const roles = await RoleService.getRolesByQuery(filter);
    res.json({roles})
})

//[POST] "/admin/roles/create"
export const create = catchAsync(async (req: Request, res: Response) => {
    const body = req.body

    const role = await RoleService.createRole(body);
    res.status(201).json({message: "Created role successfully", role})
})

//[PATCH] "/admin/roles/edit/:id"
export const edit = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id 
    const body = req.body
    const role = await RoleService.editRole(id,body);
    res.status(200).json({message: "Edited role successfully", role})
})

//[PATCH] "/admin/roles/delete/:id"
export const deleteRole = catchAsync(async (req: Request,res: Response) => {
    const id = req.params.id; 

    const role = await RoleService.deleteRole(id);
    res.status(200).json({message: "Deleted role successfully", role})
})


//   PERMISSION  \\  
