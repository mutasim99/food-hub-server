import { Router } from "express";
import { publicController } from "./public.controller";

const router = Router();

/* Get all meals */
router.get("/public/meals", publicController.getMeals);
/* Get popular Meals*/
router.get("/api/meals/popular", publicController.getPopularMeals);
/* Get categories */
/* Get all providers */
router.get('/public/providers', publicController.getAllProviders)
router.get("/categories", publicController.getAllCategories);
/* Get Featured Providers */
router.get("/api/featured/providers", publicController.getFeaturedProviders);

/* Get meal by id */
router.get("/public/meals/:id", publicController.getMealById);
/* Get provider by id */
router.get('/public/provider/:id', publicController.getProviderById)

export const publicRouter = router;
