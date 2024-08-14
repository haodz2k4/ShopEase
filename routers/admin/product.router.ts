import {Router} from "express";
import multer from "multer";
const upload = multer()
const router: Router = Router();
import * as controller from "../../controllers/admin/product.controller";
//middleware 
import { cacheMiddleware, clearCacheMiddleware } from "../../middlewares/cache.middleware";
import { uploadSingle } from "../../middlewares/uploadCloud.middleware";
const groupKey = 'products_cache'
router.get("/",cacheMiddleware(3600,groupKey),controller.index);
router.get("/detail/:id",controller.detail) 
router.patch("/change-status/:id",controller.changeStatus,clearCacheMiddleware(groupKey))
router.patch("/change-multi/:type",controller.changeMulti,clearCacheMiddleware(groupKey))
router.patch("/edit/:id",controller.edit)
router.post("/create",upload.single('thumbnail'),uploadSingle,controller.createProduct)
export default router