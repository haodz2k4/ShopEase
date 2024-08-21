import {Router} from "express";
import multer from "multer";
const upload = multer()
const router: Router = Router();
import * as controller from "../../controllers/admin/product.controller";
import * as productValidate from "../../validate/product.validate"
//middleware 
import { clearCacheMiddleware } from "../../middlewares/cache.middleware";
import { uploadSingle } from "../../middlewares/uploadCloud.middleware";
import { CACHE_KEY_GROUP } from "../../config/cache";
import { validate } from "../../middlewares/middleware";
router.get("/",validate(productValidate.getProductsByQuery),controller.index);
router.get("/detail/:id",controller.detail) 
router.patch("/change-status/:id",controller.changeStatus,clearCacheMiddleware(CACHE_KEY_GROUP.PRODUCTS))
router.patch("/change-multi/:type",controller.changeMulti,clearCacheMiddleware(CACHE_KEY_GROUP.PRODUCTS))
router.patch("/edit/:id",upload.single('thumbnail'),uploadSingle,controller.edit,clearCacheMiddleware(CACHE_KEY_GROUP.PRODUCTS))
router.post("/create",upload.single('thumbnail'),uploadSingle,controller.createProduct,clearCacheMiddleware(CACHE_KEY_GROUP.PRODUCTS));
router.patch("/delete/:id",controller.deleteProduct,clearCacheMiddleware(CACHE_KEY_GROUP.PRODUCTS));
export default router