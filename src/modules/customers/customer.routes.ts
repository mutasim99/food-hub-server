import { Router } from "express";
import { customerController } from "./customer.controller";

const router = Router();

//? Public Routes

/* Get all meals */
router.get("/meals", customerController.getMeals);

export const customerRouter = router

