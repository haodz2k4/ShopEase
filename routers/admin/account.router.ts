import { Router } from 'express';
const router: Router = Router();
import * as controller from "../../controllers/admin/account.controller"

router.get("/",controller.index)
router.post("/create",controller.create)
export default router