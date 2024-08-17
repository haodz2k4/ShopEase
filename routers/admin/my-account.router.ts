import { Router } from 'express';
const router: Router = Router();
import * as controller from "../../controllers/admin/my-account.controller";
router.get("/",controller.index)
router.patch("/update",controller.updateAccount)
router.post("/confirm-password",controller.confirmPassword)
router.post("/reset-password",controller.resetPassword)
export default router