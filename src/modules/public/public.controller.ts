import { Request, Response } from "express";
import { publicService } from "./public.service";

const getMeals = async (req: Request, res: Response) => {
  try {
    const result = await publicService.getMeals();
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
    const result = await publicService.getPopularMeals();
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
    const result = await publicService.getMealById(id);
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

const getAllCategories = async (req: Request, res: Response) => {
    try {
      const result = await publicService.getAllCategories();
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
      const providers = await publicService.getFeaturedProviders();
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

export const publicController = {
  getMeals,
  getPopularMeals,
  getMealById,
  getAllCategories,
  getFeaturedProviders
};
