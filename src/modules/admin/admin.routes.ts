import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth.middleware";
import { adminController } from "./admin.controller";

const router = Router();

/* Users */
router.get("/users-admin", auth(UserRole.ADMIN), adminController.getAllUsers);
/* Categories */
router.post(
  "/categories",
  auth(UserRole.ADMIN),
  adminController.createCategory
);

/* orders */
router.get("/admin-order", auth(UserRole.ADMIN), adminController.getAllOrders);

/* Update user */
router.patch("/users-admin/:id", auth(UserRole.ADMIN), adminController.updateUser);

export const adminRouter = router;
