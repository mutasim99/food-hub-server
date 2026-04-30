//*Users
import { adminServices } from "./admin.service.js";
import paginationAndSortingHelper from "../../helpers/paginationAndSortingHelper.js";
const getAllUsers = async (req, res) => {
    try {
        const { search } = req.query;
        const searchString = typeof search === "string" ? search : undefined;
        const { page, limit, sortBy, sortOrder, skip } = paginationAndSortingHelper(req.query);
        const users = await adminServices.getAllUsers({
            search: searchString,
            page,
            limit,
            sortBy,
            sortOrder,
            skip,
        });
        res.status(200).json({
            success: true,
            message: "Successfully retrieved all users",
            data: users,
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
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const payload = req.body;
        const result = await adminServices.updateUser(userId, payload);
        res.status(200).json({
            success: true,
            message: "Successfully retrieved all users",
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
/* Categories */
const createCategory = async (req, res) => {
    try {
        const { name, image } = req.body;
        const result = await adminServices.createCategory(name, image);
        res.status(201).json({
            success: true,
            message: "Category added successfully",
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
/* Orders */
const getAllOrders = async (req, res) => {
    try {
        const result = await adminServices.getAllOrders();
        res.status(200).json({
            success: true,
            message: "Successfully retrieved all Orders",
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
export const adminController = {
    getAllUsers,
    updateUser,
    createCategory,
    getAllOrders,
};
//# sourceMappingURL=admin.controller.js.map