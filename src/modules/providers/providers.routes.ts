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

export const providerRouter = router;
