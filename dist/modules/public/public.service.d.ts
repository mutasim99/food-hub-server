import { MealFilterTypes } from "./public.types";
export declare const publicService: {
    getMeals: (filters: MealFilterTypes) => Promise<({
        provider: {
            image: string;
            shopName: string;
        };
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
    getPopularMeals: () => Promise<({
        provider: {
            shopName: string;
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
    getMealById: (mealId: string) => Promise<({
        provider: {
            id: string;
            image: string;
            shopName: string;
            address: string;
        };
        review: ({
            user: {
                name: string;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            rating: number;
            comment: string;
            mealId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        name: string;
        image: string | null;
        providerId: string;
        description: string;
        price: number;
        categoryId: string;
    }) | null>;
    getAllCategories: () => Promise<{
        id: string;
        name: string;
        image: string;
    }[]>;
    getFeaturedProviders: () => Promise<({
        user: {
            name: string;
        };
        Meal: {
            name: string;
        }[];
    } & {
        phone: string;
        id: string;
        userId: string;
        image: string;
        shopName: string;
        address: string;
    })[]>;
    getAllProviders: () => Promise<({
        user: {
            name: string;
        };
    } & {
        phone: string;
        id: string;
        userId: string;
        image: string;
        shopName: string;
        address: string;
    })[]>;
    getProviderById: (providerId: string) => Promise<({
        Meal: ({
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
        })[];
    } & {
        phone: string;
        id: string;
        userId: string;
        image: string;
        shopName: string;
        address: string;
    }) | null>;
};
//# sourceMappingURL=public.service.d.ts.map