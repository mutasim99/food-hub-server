//*Users

import { Request, Response } from "express";
import { adminServices } from "./admin.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await adminServices.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Successfully retrieved all users",
      data: users,
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id as string;
    const payload = req.body;
    const result = await adminServices.updateUser(userId, payload);
    res.status(200).json({
      success: true,
      message: "Successfully retrieved all users",
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

/* Categories */
const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const result = await adminServices.createCategory(name);
    res.status(201).json({
      success: true,
      message: "Category added successfully",
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

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await adminServices.getAllCategories();
    res.status(200).json({
      success: true,
      message: "Successfully retrieved all categories",
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

/* Orders */
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await adminServices.getAllOrders();
    res.status(200).json({
      success: true,
      message: "Successfully retrieved all Orders",
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

export const adminController = {
  getAllUsers,
  updateUser,
  createCategory,
  getAllCategories,
  getAllOrders,
};
