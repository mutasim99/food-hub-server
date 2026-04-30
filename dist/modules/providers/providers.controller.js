import { providerServices } from "./providers.service.js";
import AppError from "../../errorHelper/AppError.js";
import status from "http-status";
/* Get My Meals */
const getMyMeals = async (req, res) => {
    try {
        const userId = req.user?.id;
        const result = await providerServices.getMyMeals(userId);
        res.status(201).json({
            success: true,
            message: "Meal retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Something went wrong";
        return res.status(500).json({
            success: false,
            error: errorMessage,
        });
    }
};
/* Add a new meal */
const addMeal = async (req, res) => {
    try {
        if (!req.file) {
            throw new AppError(status.BAD_REQUEST, "Meal image is not required");
        }
        const userId = req.user?.id;
        const mealData = {
            ...req.body,
            price: Number(req.body.price),
            image: req.file.path,
        };
        const result = await providerServices.addMeal(userId, mealData);
        res.status(201).json({
            success: true,
            message: "Meal published successfully! 🍳",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Something went wrong";
        return res.status(500).json({
            success: false,
            error: errorMessage,
        });
    }
};
/* Update meal */
const UpdateMeal = async (req, res) => {
    try {
        const mealId = req.params.id;
        const userId = req.user?.id;
        const data = req.body;
        const result = await providerServices.updateMeal(mealId, userId, data);
        res.status(201).json({
            success: true,
            message: "Meal updated successfully",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
        res.status(403).json({
            success: false,
            error: errorMessage,
        });
    }
};
const deleteMeal = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user?.id;
        const result = await providerServices.deleteMeal(id, userId);
        res.status(200).json({
            success: true,
            message: "Meal deleted successfully",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
        res.status(500).json({
            success: false,
            error: errorMessage,
        });
    }
};
const getProviderOrders = async (req, res) => {
    try {
        const userId = req.user?.id;
        const result = await providerServices.getProviderOrders(userId);
        res.status(200).json({
            success: true,
            message: "Successfully retrieved all orders",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
        res.status(400).json({
            success: false,
            error: errorMessage,
        });
    }
};
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const orderId = req.params.id;
        const userId = req.user?.id;
        const result = await providerServices.updateOrderStatus(orderId, userId, status);
        res.status(200).json({
            success: true,
            message: "Order Status updated successfully",
            data: result,
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
        res.status(400).json({
            success: false,
            error: errorMessage,
        });
    }
};
export const providerController = {
    getMyMeals,
    addMeal,
    UpdateMeal,
    deleteMeal,
    getProviderOrders,
    updateOrderStatus,
};
//# sourceMappingURL=providers.controller.js.map