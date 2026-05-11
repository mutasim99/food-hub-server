export declare const adminServices: {
    getAdminStats: () => Promise<{
        total: number;
        customers: number;
        providers: number;
        categories: number;
        orders: number;
        totalUsers: {
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
        }[];
    }>;
    getAllUsers: ({ search, page, limit, sortBy, sortOrder, skip, }: {
        search: string | undefined;
        page: number;
        limit: number;
        sortBy: string | undefined;
        sortOrder: string | undefined;
        skip: number;
    }) => Promise<{
        data: ({
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
        })[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPage: number;
        };
    }>;
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
    getAllOrders: ({ search, page, limit, sortBy, sortOrder, skip, }: {
        search: string | undefined;
        page: number;
        limit: number;
        sortBy: string | undefined;
        sortOrder: string | undefined;
        skip: number;
    }) => Promise<{
        meta: {
            totalUsers: number;
            completeCount: number;
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
        data: {
            status: import("../../generated/enums").OrderStatus;
            id: string;
            createdAt: Date;
            total: number;
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
                    name: string;
                    price: number;
                };
            } & {
                id: string;
                price: number;
                mealId: string;
                orderId: string;
                qty: number;
            })[];
        }[];
    }>;
};
//# sourceMappingURL=admin.service.d.ts.map