import { Request, Response } from "express";
import { providerServices } from "./providers.service";

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

const addMeal = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const data = req.body;
    const result = await providerServices.addMeal(userId, data);
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

export const providerController = {
  createProfile,
  addMeal
};
