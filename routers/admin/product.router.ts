import {Router} from "express";
import { model } from "mongoose";
const router: Router = Router();
import * as controller from "../../controllers/admin/product.controller";
//middleware 
import paginate from "../../middlewares/paginate.middleware";
router.get("/",paginate(model('product'),20),controller.index);
router.get("/detail/:id",controller.detail) 
router.patch("/change-status/:id",controller.changeStatus)

export default router