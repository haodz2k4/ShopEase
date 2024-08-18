import { Router } from "express";

const router: Router = Router();
import * as controller from "../../controllers/clients/auth.controller"
router.post("/login",controller.login)
router.post("/register",controller.register)
router.get("/logout",controller.logout)
router.post("/forgot-password",controller.forgotPassword)
router.post("/verify-otp",controller.verifyOtp)
router.post("/reset-password",controller.resetPassword)

export default router