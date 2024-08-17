import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/clients/user.controller"

router.post("/register",controller.register)
router.post("/login",controller.login)
router.get("/logout",controller.logout)
export default router