import { Request, Response } from "express";
import { providerServices } from "./providers.service";

/* Get all providers */
const getAllProviders = async (req: Request, res: Response) => {
  try {
    const result = await providerServices.getAllProviders();
    res.status(200).json({
      success: true,
      message: "Successfully retrieve all provider profile",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};
/* Creating provider profile */
const createProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const data = req.body;
    const result = await providerServices.createProfile(userId as string, data);
    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

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
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
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
    res.status(403).json({
      success: false,
      message: "Internal server error",
      error: error,
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
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
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
    res.status(400).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

export const providerController = {
  createProfile,
  addMeal,
  UpdateMeal,
  getAllProviders,
  deleteMeal,
  getProviderOrders
};
