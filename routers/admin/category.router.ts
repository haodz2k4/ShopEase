import { Router } from 'express';
const router: Router = Router();
import multer from 'multer';
const upload = multer()
import * as controller from "../../controllers/admin/category.controller";
//middleware 
import { uploadSingle } from '../../middlewares/uploadCloud.middleware';
router.get("/",controller.index);
router.get("/detail/:id",controller.detail)
router.post("/create",upload.single('thumbnail'),uploadSingle,controller.create)
router.patch("/edit/:id",upload.single('thumbnail'),uploadSingle,controller.edit)
router.patch("/delete/:id",controller.deleteCategory)
export default router