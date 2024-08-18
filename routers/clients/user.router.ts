import { Router } from "express";
const router: Router = Router();
import multer from "multer";
const upload = multer()
import * as controller from "../../controllers/clients/user.controller"
import { requireAuth } from "../../middlewares/clients/auth.middleware";
import { uploadSingle } from "../../middlewares/uploadCloud.middleware";
router.post("/register",controller.register)
router.post("/login",controller.login)
router.get("/logout",controller.logout)
router.get("/profiles",requireAuth,controller.profile)
router.post("/profiles/add-address",requireAuth,controller.addAdress)
router.patch("/profiles/update",upload.single('avatar'),uploadSingle,requireAuth,controller.update)
router.patch("/profiles/change-avatar",requireAuth,upload.single('avatar'),uploadSingle,controller.changeAvatar)
export default router