import { Router } from "express";
import { customerController } from "./customer.controller";
import auth, { UserRole } from "../../middleware/auth.middleware";

const router = Router();

//? Public Routes


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

/* Get review */
router.get("/reviews/:mealId", customerController.getMealReview);

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
