import { Router } from "express";
import { customerController } from "./customer.controller";
import auth, { UserRole } from "../../middleware/auth.middleware";
import { providerController } from "../providers/providers.controller";

const router = Router();

//? Public Routes

/* Get all meals */
router.get("/meals", customerController.getMeals);
/* Get popular Meals*/
router.get("/api/meals/popular", customerController.getPopularMeals);
/* Get Featured Providers */
router.get("/api/featured/providers", customerController.getFeaturedProviders);
//? Customers only
/* Create order */
router.post("/order", auth(UserRole.CUSTOMER), customerController.createOrder);
/* Get Own order */
router.get("/order", auth(UserRole.CUSTOMER), customerController.getMyOrder);
/* Create review */
router.post(
  "/reviews",
  auth(UserRole.CUSTOMER),
  customerController.createReview
);
/* Get categories */
router.get("/categories", customerController.getAllCategories);

/* Create provider profile */
router.post(
  "/profile",
  auth(UserRole.CUSTOMER),
  customerController.createProfile
);

/* Get order details */
router.get(
  "/order/:id",
  auth(UserRole.CUSTOMER),
  customerController.getOrderById
);
/* Get meal by id */
router.get("/meals/:id", customerController.getMealById);

export const customerRouter = router;
