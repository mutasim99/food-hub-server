import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth.middleware";
import { adminController } from "./admin.controller";

const router = Router();

/* Users */
router.get("/users", auth(UserRole.ADMIN), adminController.getAllUsers);
/* Categories */
router.post(
  "/categories",
  auth(UserRole.ADMIN),
  adminController.createCategory
);

/* Update user */
router.patch("/users/:id", auth(UserRole.ADMIN), adminController.updateUser);

export const adminRouter = router;
