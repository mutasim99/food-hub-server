import { Request, Response } from "express";
import { providerServices } from "./providers.service";
import { prisma } from "../../lib/prisma";

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

export const providerController = {
  createProfile,
  addMeal,
  UpdateMeal,
};
