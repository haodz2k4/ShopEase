import {Router} from "express";
import { model } from "mongoose";
const router: Router = Router();
import * as controller from "../../controllers/admin/product.controller";
//middleware 
import { cacheMiddleware, clearCacheMiddleware } from "../../middlewares/cache.middleware";

const groupKey = 'products_cache'
router.get("/",cacheMiddleware(3600,groupKey),controller.index);
router.get("/detail/:id",controller.detail) 
router.patch("/change-status/:id",controller.changeStatus,clearCacheMiddleware(groupKey))
router.patch("/change-multi/:type",controller.changeMulti,clearCacheMiddleware(groupKey))

export default router