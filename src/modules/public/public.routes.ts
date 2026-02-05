import { Router } from "express";
import { publicController } from "./public.controller";

const router = Router();

/* Get all meals */
router.get("/meals", publicController.getMeals);
/* Get popular Meals*/
router.get("/api/meals/popular", publicController.getPopularMeals);
/* Get categories */
router.get("/categories", publicController.getAllCategories);
/* Get Featured Providers */
router.get("/api/featured/providers", publicController.getFeaturedProviders);

/* Get meal by id */
router.get("/meals/:id", publicController.getMealById);

export const publicRouter = router;
