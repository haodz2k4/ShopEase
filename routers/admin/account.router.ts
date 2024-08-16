import { Router } from 'express';
const router: Router = Router();
import * as controller from "../../controllers/admin/account.controller"

router.get("/",controller.index)
router.post("/create",controller.create)
router.patch("/edit/:id",controller.edit)
router.patch("/delete/:id",controller.deleteAccount)
export default router