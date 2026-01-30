import { Request, Response } from "express";
import { providerServices } from "./providers.service";

/* Get all providers */


/* Add a new meal */
const addMeal = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const data = req.body;
    const result = await providerServices.addMeal(data, userId);
    res.status(201).json({
      success: true,
      message: "Meal added successfully",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    return res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};

/* Update meal */
const UpdateMeal = async (req: Request, res: Response) => {
  try {
    const mealId = req.params.id as string;
    const userId = req.user?.id as string;
    const data = req.body;
    const result = await providerServices.updateMeal(mealId, userId, data);
    res.status(201).json({
      success: true,
      message: "Meal updated successfully",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    res.status(403).json({
      success: false,
      error: errorMessage,
    });
  }
};

const deleteMeal = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const userId = req.user?.id as string;

    const result = await providerServices.deleteMeal(id, userId);
    res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};

const getProviderOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const result = await providerServices.getProviderOrders(userId);
    res.status(200).json({
      success: true,
      message: "Successfully retrieved all orders",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    res.status(400).json({
      success: false,
      error: errorMessage,
    });
  }
};

const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const status = req.body;
    const orderId = req.params.id as string;
    const userId = req.user?.id as string;
    const result = await providerServices.updateOrderStatus(
      orderId,
      userId,
      status
    );

    res.json(200).json({
      success: true,
      message: "Order Status updated successfully",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    res.status(400).json({
      success: false,
      error: errorMessage,
    });
  }
};

export const providerController = {
  addMeal,
  UpdateMeal,
  deleteMeal,
  getProviderOrders,
  updateOrderStatus,
};
