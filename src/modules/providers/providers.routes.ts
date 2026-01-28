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
  "/order",
  auth(UserRole.PROVIDER),
  providerController.getProviderOrders
);
/* Create provider profile */
router.post(
  "/profile",
  auth(UserRole.PROVIDER),
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

/* Delete Meal */
router.delete(
  "/meals/:id",
  auth(UserRole.PROVIDER),
  providerController.deleteMeal
);
export const providerRouter = router;
