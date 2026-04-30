export declare const adminServices: {
    getAllUsers: ({ search, page, limit, sortBy, sortOrder, skip, }: {
        search: string | undefined;
        page: number;
        limit: number;
        sortBy: string | undefined;
        sortOrder: string | undefined;
        skip: number;
    }) => Promise<({
        ProviderProfile: {
            phone: string;
            id: string;
            userId: string;
            image: string;
            shopName: string;
            address: string;
        } | null;
    } & {
        role: import("../../generated/enums").Role;
        phone: string | null;
        status: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image: string | null;
    })[]>;
    updateUser: (userId: string, data: {
        role?: "ADMIN" | "PROVIDER" | "CUSTOMER";
        status?: "ACTIVE" | "INACTIVE";
    }) => Promise<{
        role: import("../../generated/enums").Role;
        phone: string | null;
        status: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image: string | null;
    }>;
    createCategory: (name: string, image: string) => Promise<{
        id: string;
        name: string;
        image: string;
    }>;
    getAllOrders: () => Promise<({
        customer: {
            role: import("../../generated/enums").Role;
            phone: string | null;
            status: string | null;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            emailVerified: boolean;
            name: string;
            image: string | null;
        };
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
    })[]>;
};
//# sourceMappingURL=admin.service.d.ts.map