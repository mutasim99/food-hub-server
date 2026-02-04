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
router.post(
  "/create-order",
  auth(UserRole.CUSTOMER),
  customerController.createOrder
);
/* Get Own order */
router.get(
  "/my-orders",
  auth(UserRole.CUSTOMER),
  customerController.getMyOrder
);
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
  "/create-profile",
  auth(UserRole.CUSTOMER),
  customerController.createProfile
);

/* Create cart */
router.post("/cart/add", auth(UserRole.CUSTOMER), customerController.addToCart);
/* get Cart */
router.get("/cart", auth(UserRole.CUSTOMER), customerController.getCart);

/* Get order details */
router.get(
  "/my-orders/:id",
  auth(UserRole.CUSTOMER),
  customerController.getOrderById
);
/* Get meal by id */
router.get("/meals/:id", customerController.getMealById);
/* Remove from cart */
router.delete(
  "/cart-item/:itemId",
  auth(UserRole.CUSTOMER),
  customerController.removeFromCart
);
/* Cancel order */
router.patch(
  "/my-orders/:id/cancel",
  auth(UserRole.CUSTOMER),
  customerController.cancelOrder
);
export const customerRouter = router;
