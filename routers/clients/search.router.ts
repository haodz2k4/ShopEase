import { Router } from "express";
const router: Router = Router()
import * as controller from "../../controllers/clients/search.controller"
//middlewares 
import { cacheByMethodAndUrl } from "../../middlewares/cache.middleware";
import { CACHE_KEY_GROUP } from "../../config/cache";
router.get("/",cacheByMethodAndUrl(3600,CACHE_KEY_GROUP.PRODUCTS),controller.index)
export default router