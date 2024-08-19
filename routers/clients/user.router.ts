import { Router } from "express";
const router: Router = Router();
import multer from "multer";
const upload = multer()
import * as controller from "../../controllers/clients/user.controller"
import { requireAuth } from "../../middlewares/clients/auth.middleware";
import { uploadSingle } from "../../middlewares/uploadCloud.middleware";
router.get("/profiles",controller.profile)
router.post("/profiles/add-address",controller.addAdress)
router.patch("/profiles/update",upload.single('avatar'),uploadSingle,requireAuth,controller.update)
router.patch("/profiles/change-avatar",upload.single('avatar'),uploadSingle,controller.changeAvatar)
router.post("/profiles/favorite-list/add/:product_id",controller.addFavoriteList)
router.delete("/profiles/favorite-list/delete/:product_id",controller.deleteFavoriteList)
export default router