export declare const getOrCreateCart: (customerId: string) => Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
}>;
export declare const addToCart: (customerId: string, mealId: string, qty: number) => Promise<{
    id: string;
    price: number;
    mealId: string;
    qty: number;
    cartId: string;
}>;
export declare const getCart: (customerId: string) => Promise<({
    items: ({
        meal: {
            id: string;
            createdAt: Date;
            name: string;
            image: string | null;
            providerId: string;
            description: string;
            price: number;
            categoryId: string;
        };
    } & {
        id: string;
        price: number;
        mealId: string;
        qty: number;
        cartId: string;
    })[];
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    customerId: string;
}) | null>;
export declare const removeFromCart: (customerId: string, itemId: string) => Promise<{
    id: string;
    price: number;
    mealId: string;
    qty: number;
    cartId: string;
}>;
export declare const customerServices: {
    createOrder: (userId: string, address: string, items: {
        mealId: string;
        qty: number;
    }[]) => Promise<({
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
        status: import("../../generated/enums").OrderStatus;
        id: string;
        createdAt: Date;
        providerId: string;
        address: string;
        customerId: string;
        total: number;
    }) | null>;
    getMyOrder: (userId: string) => Promise<({
        items: ({
            meal: {
                id: string;
                name: string;
                image: string | null;
                price: number;
            };
        } & {
            id: string;
            price: number;
            mealId: string;
            orderId: string;
            qty: number;
        })[];
    } & {
        status: import("../../generated/enums").OrderStatus;
        id: string;
        createdAt: Date;
        providerId: string;
        address: string;
        customerId: string;
        total: number;
    })[]>;
    createReview: (userId: string, mealId: string, rating: number, comment: string) => Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        rating: number;
        comment: string;
        mealId: string;
    }>;
    getMealReview: (mealId: string) => Promise<({
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
    })[]>;
    cancelOrder: (orderId: string, userId: string) => Promise<{
        status: import("../../generated/enums").OrderStatus;
        id: string;
        createdAt: Date;
        providerId: string;
        address: string;
        customerId: string;
        total: number;
    }>;
    getOrderById: (orderId: string, userId: string) => Promise<{
        items: ({
            meal: {
                id: string;
                createdAt: Date;
                name: string;
                image: string | null;
                providerId: string;
                description: string;
                price: number;
                categoryId: string;
            };
        } & {
            id: string;
            price: number;
            mealId: string;
            orderId: string;
            qty: number;
        })[];
    } & {
        status: import("../../generated/enums").OrderStatus;
        id: string;
        createdAt: Date;
        providerId: string;
        address: string;
        customerId: string;
        total: number;
    }>;
    createProviderProfile: (userId: string, data: any) => Promise<{
        phone: string;
        id: string;
        userId: string;
        image: string;
        shopName: string;
        address: string;
    } | undefined>;
    addToCart: (customerId: string, mealId: string, qty: number) => Promise<{
        id: string;
        price: number;
        mealId: string;
        qty: number;
        cartId: string;
    }>;
    getCart: (customerId: string) => Promise<({
        items: ({
            meal: {
                id: string;
                createdAt: Date;
                name: string;
                image: string | null;
                providerId: string;
                description: string;
                price: number;
                categoryId: string;
            };
        } & {
            id: string;
            price: number;
            mealId: string;
            qty: number;
            cartId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
    }) | null>;
    removeFromCart: (customerId: string, itemId: string) => Promise<{
        id: string;
        price: number;
        mealId: string;
        qty: number;
        cartId: string;
    }>;
};
//# sourceMappingURL=customer.service.d.ts.map