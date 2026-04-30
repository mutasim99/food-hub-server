import { Meal, OrderStatus } from "../../generated/client";
import { ICreateMealPayload } from "./provider.interface";
export declare const providerServices: {
    getMyMeals: (userId: string) => Promise<({
        category: {
            id: string;
            name: string;
            image: string;
        };
    } & {
        id: string;
        createdAt: Date;
        name: string;
        image: string | null;
        providerId: string;
        description: string;
        price: number;
        categoryId: string;
    })[]>;
    addMeal: (userId: string, payload: ICreateMealPayload) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        image: string | null;
        providerId: string;
        description: string;
        price: number;
        categoryId: string;
    } | undefined>;
    updateMeal: (mealId: string, userId: string, data: Meal) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        image: string | null;
        providerId: string;
        description: string;
        price: number;
        categoryId: string;
    }>;
    deleteMeal: (mealId: string, userId: string) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        image: string | null;
        providerId: string;
        description: string;
        price: number;
        categoryId: string;
    }>;
    getProviderOrders: (userId: string) => Promise<({
        customer: {
            email: string;
            name: string;
        };
        items: ({
            meal: {
                name: string;
                image: string | null;
            };
        } & {
            id: string;
            price: number;
            mealId: string;
            orderId: string;
            qty: number;
        })[];
    } & {
        status: OrderStatus;
        id: string;
        createdAt: Date;
        providerId: string;
        address: string;
        customerId: string;
        total: number;
    })[]>;
    updateOrderStatus: (orderId: string, userId: string, newStatus: OrderStatus) => Promise<{
        status: OrderStatus;
        id: string;
        createdAt: Date;
        providerId: string;
        address: string;
        customerId: string;
        total: number;
    }>;
};
//# sourceMappingURL=providers.service.d.ts.map