import { Router } from "express";
import { profileController } from "./profile.controller";
import { multerUpload } from "../../config/multer.config";
import auth, { UserRole } from "../../middleware/auth.middleware";

const router = Router();

/* Get profile */
router.get(
  "/profile/me",
  auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN),
  profileController.getMyProfile
);

router.patch(
  "/profile/me",
  auth(UserRole.CUSTOMER, UserRole.PROVIDER, UserRole.ADMIN),
  multerUpload.single("image"),
  profileController.updateMyProfile
);

export const ProfileRouter = router;
