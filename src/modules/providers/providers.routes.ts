import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth.middleware";
import { providerController } from "./providers.controller";

const router = Router();

/* Get all provider */
router.get(
  "/api/providers",
  auth(UserRole.ADMIN),
  providerController.getAllProviders
);
/* Get all provider orders */
router.get(
  "/orders",
  auth(UserRole.PROVIDER),
  providerController.getProviderOrders
);
/* Create provider profile */
router.post(
  "/profile",
  auth(UserRole.CUSTOMER),
  providerController.createProfile
);

/* Add a Meal */
router.post("/api/meals", auth(UserRole.PROVIDER), providerController.addMeal);

/* Update Meal */
router.put(
  "/api/meals/:id",
  auth(UserRole.PROVIDER),
  providerController.UpdateMeal
);
/* Update order Status */
router.patch(
  "/orders/:id/status",
  auth(UserRole.PROVIDER),
  providerController.updateOrderStatus
);

/* Delete Meal */
router.delete(
  "/meals/:id",
  auth(UserRole.PROVIDER),
  providerController.deleteMeal
);
export const providerRouter = router;
