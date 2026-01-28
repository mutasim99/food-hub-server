import { Router } from "express";
import { customerController } from "./customer.controller";
import auth, { UserRole } from "../../middleware/auth.middleware";

const router = Router();

//? Public Routes

/* Get all meals */
router.get("/meals", customerController.getMeals);
/* Get meal by id */
router.get("/meals/:id", customerController.getMealById);

//? Customers only
/* Create order */
router.post("/orders", auth(UserRole.CUSTOMER), customerController.createOrder);
/* Get Own order */
router.get('/order', auth(UserRole.CUSTOMER), customerController.getMyOrder)

export const customerRouter = router;
