import { Router } from 'express';
const router: Router = Router();
import * as controller from "../../controllers/admin/wareHouse.controller";
router.get("/",controller.index)
router.get("/detail/:id",controller.detail)
router.post("/create",controller.create)
router.patch("/edit/:id",controller.edit)
router.patch("/delete/:id",controller.deleteWareHouse)
export default router