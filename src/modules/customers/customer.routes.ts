import { Router } from "express";
import { customerController } from "./customer.controller";
import auth, { UserRole } from "../../middleware/auth.middleware";

const router = Router();

//? Public Routes

/* Get all meals */
router.get("/meals", customerController.getMeals);

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

/* Get order details */
router.get(
  "/order/:id",
  auth(UserRole.CUSTOMER),
  customerController.getOrderById
);
/* Get meal by id */
router.get("/meals/:id", customerController.getMealById);

export const customerRouter = router;
