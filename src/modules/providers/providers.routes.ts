import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth.middleware";
import { providerController } from "./providers.controller";

const router = Router();

/* Get my meals */
router.get(
  "/provider-meal",
  auth(UserRole.PROVIDER),
  providerController.getMyMeals
);
/* Get all orders of a provider */
router.get(
  "/provider-orders",
  auth(UserRole.PROVIDER),
  providerController.getProviderOrders
);

/* Add a Meal */
router.post("/api/add-meals", auth(UserRole.PROVIDER), providerController.addMeal);

/* Update Meal */
router.put(
  "/api/meals/:id",
  auth(UserRole.PROVIDER),
  providerController.UpdateMeal
);
/* Update order Status */
router.patch(
  "/provider-orders/:id/status",
  auth(UserRole.PROVIDER),
  providerController.updateOrderStatus
);

/* Delete Meal */
router.delete(
  "/provider-meal/:id",
  auth(UserRole.PROVIDER),
  providerController.deleteMeal
);
export const providerRouter = router;
