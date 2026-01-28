import { Request, Response } from "express";
import { customerServices } from "./customer.service";

const getMeals = async (req: Request, res: Response) => {
  try {
    const result = await customerServices.getMeals();
    res.status(200).json({
      success: true,
      message: "Successfully retrieved all meals",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: error,
    });
  }
};

export const customerController = {
  getMeals,
};
