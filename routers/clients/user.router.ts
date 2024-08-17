import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/clients/user.controller"
import { requireAuth } from "../../middlewares/clients/auth.middleware";
router.post("/register",controller.register)
router.post("/login",controller.login)
router.get("/logout",controller.logout)
router.get("/profiles",requireAuth,controller.profile)
router.post("/profiles/add-address",requireAuth,controller.addAdress)
export default router