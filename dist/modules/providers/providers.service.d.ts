import { OrderStatus } from "../../generated/client";
import { ICreateMealPayload, IUpdateMealPayload } from "./provider.interface";
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
        isDeleted: boolean;
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
        isDeleted: boolean;
        categoryId: string;
    } | undefined>;
    updateMeal: (mealId: string, userId: string, data: Partial<IUpdateMealPayload>) => Promise<{
        id: string;
        createdAt: Date;
        name: string;
        image: string | null;
        providerId: string;
        description: string;
        price: number;
        isDeleted: boolean;
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
        isDeleted: boolean;
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
                isDeleted: boolean;
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