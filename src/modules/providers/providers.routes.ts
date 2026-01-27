import { Router } from "express";
import auth, { UserRole } from "../../middleware/auth.middleware";
import { providerController } from "./providers.controller";

const router = Router();

/* Create provider profile */
router.post(
  "/profile",
  auth(UserRole.PROVIDER),
  providerController.createProfile
);

/* Add a Meal */
router.post("/meals", auth(UserRole.PROVIDER), providerController.addMeal);

/* Update Meal */
router.put(
  "/meals/:id",
  auth(UserRole.PROVIDER),
  providerController.UpdateMeal
);
export const providerRouter = router;
