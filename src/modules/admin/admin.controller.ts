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
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
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
    res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: error,
      });
    }
  }


export const adminController = {
  getAllUsers,
  updateUser
};
