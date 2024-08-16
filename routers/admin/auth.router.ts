import { Router } from "express";
const router: Router = Router();
import * as controller from "../../controllers/admin/auth.controller"
router.post("/login",controller.login)
router.get("/logout",controller.logout)
export default router