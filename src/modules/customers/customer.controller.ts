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

const getMealById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const result = await customerServices.getMealById(id);
    res.status(200).json({
      success: true,
      message: "Successfully retrieved",
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

const createOrder = async (req: Request, res: Response) => {
  try {
    const parsed = req.body;
    const userId = req.user?.id as string;
    const result = await customerServices.createOrder(
      userId,
      parsed.address,
      parsed.items
    );
    res.status(201).json({
      success: true,
      message: "Order created successfully",
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

export const customerController = {
  getMeals,
  getMealById,
  createOrder
};
