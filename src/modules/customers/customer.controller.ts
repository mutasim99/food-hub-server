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
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};

const getPopularMeals = async (req: Request, res: Response) => {
  try {
    const result = await customerServices.getPopularMeals();
    res.status(200).json({
      success: true,
      message: "Successfully retrieved popular meals",
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
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const { address, items } = req.body;
    if (!address || !items?.length) {
      return res.status(400).json({
        success: false,
        message: "Address and items are required",
      });
    }
    const userId = req.user?.id as string;
    const result = await customerServices.createOrder(userId, address, items);
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Order failed";
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: errorMessage,
    });
  }
};

const getMyOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const result = await customerServices.getMyOrder(userId);
    res.status(200).json({
      success: true,
      message: "Successfully retrieved",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};

const createReview = async (req: Request, res: Response) => {
  try {
    const { mealId, rating, comment } = req.body;
    const userId = req.user?.id as string;
    const result = customerServices.createReview(
      userId,
      mealId,
      rating,
      comment
    );
    res.status(200).json({
      success: true,
      message: "Successfully retrieved",
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

const cancelOrder = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id as string;
    const userId = req.user?.id as string;
    const result = await customerServices.cancelOrder(orderId, userId)
    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong";
    res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};

const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderId = req.params.id as string;
    const userId = req.user?.id as string;

    const result = await customerServices.getOrderById(orderId, userId);
    res.status(200).json({
      success: true,
      message: "Successfully retrieved",
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

/* Creating provider profile */
const createProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const data = req.body;
    const result = await customerServices.createProfile(userId as string, data);
    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: result,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Something went wrong!";
    return res.status(500).json({
      success: false,
      error: errorMessage,
    });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await customerServices.getAllCategories();
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

const getFeaturedProviders = async (req: Request, res: Response) => {
  try {
    const providers = await customerServices.getFeaturedProviders();
    res.status(200).json({
      success: true,
      message: "Successfully retrieved featured restaurant",
      data: providers.map((P) => ({
        id: P.id,
        name: P.shopName,
        image: P.image,
        owner: P.user.name,
        address: P.address,
        totalMeal: P.Meal.length,
      })),
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

export const customerController = {
  getMeals,
  getPopularMeals,
  getMealById,
  createOrder,
  getMyOrder,
  createReview,
  getOrderById,
  cancelOrder,
  createProfile,
  getAllCategories,
  getFeaturedProviders,
};
