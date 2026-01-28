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
router.post("/order", auth(UserRole.CUSTOMER), customerController.createOrder);

export const customerRouter = router;
