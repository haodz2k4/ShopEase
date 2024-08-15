import { Router } from 'express';
const router: Router = Router();
import * as controller from "../../controllers/admin/supplier.controller"
router.get("/",controller.index)
router.post("/create",controller.create)
router.patch("/edit/:id",controller.edit)
export default router