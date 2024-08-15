import { Router } from 'express';
const router: Router = Router();
import * as controller from "../../controllers/admin/role.controller";

router.get("/",controller.index)
router.post("/create",controller.create)
router.patch("/edit",controller.edit)
router.patch("/delete/:id",controller.deleteRole)
export default router