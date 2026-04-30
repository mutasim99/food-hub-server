import { Router } from "express";
import { profileController } from "./profile.controller.js";
import { multerUpload } from "../../config/multer.config.js";
import auth, { UserRole } from "../../middleware/auth.middleware.js";
const router = Router();
/* Get profile */
router.get("/profile/me", auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN), profileController.getMyProfile);
router.patch("/profile/me", auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN), multerUpload.single("image"), profileController.updateMyProfile);
export const ProfileRouter = router;
//# sourceMappingURL=profile.routes.js.map