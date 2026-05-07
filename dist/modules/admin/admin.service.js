import { prisma } from "../../lib/prisma.js";
const getAllUsers = async ({ search, page, limit, sortBy, sortOrder, skip, }) => {
    const andCondition = [];
    if (search) {
        andCondition.push({
            OR: [
                {
                    name: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
                {
                    email: {
                        contains: search,
                        mode: "insensitive",
                    },
                },
            ],
        });
    }
    return prisma.user.findMany({
        take: limit,
        skip,
        where: {
            AND: andCondition,
        },
        include: {
            ProviderProfile: true,
        },
        orderBy: sortBy && sortOrder
            ? {
                [sortBy]: sortOrder,
            }
            : { createdAt: "desc" },
    });
};
const updateUser = async (userId, data) => {
    if (!data.role && !data.status) {
        throw new Error("Nothing to update");
    }
    return prisma.user.update({
        where: {
            id: userId,
        },
        data,
    });
};
/* Categories */
const createCategory = async (name, image) => {
    const isExists = await prisma.category.findUnique({
        where: { name },
    });
    if (isExists) {
        throw new Error("Category already exists");
    }
    return await prisma.category.create({
        data: {
            name,
            image,
        },
    });
};
/* Orders */
const getAllOrders = async ({ search, page, limit, sortBy, sortOrder, skip, }) => {
    const andCondition = [];
    if (search) {
        andCondition.push({
            OR: [
                {
                    items: {
                        some: {
                            meal: {
                                name: {
                                    contains: search,
                                    mode: "insensitive",
                                },
                            },
                        },
                    },
                },
                {
                    customer: {
                        email: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
            ],
        });
    }
    const whereCondition = {
        AND: andCondition,
    };
    const result = await prisma.$transaction(async (tx) => {
        const data = await tx.order.findMany({
            select: {
                id: true,
                customer: true,
                total: true,
                status: true,
                createdAt: true,
                items: {
                    include: {
                        meal: {
                            select: {
                                name: true,
                                price: true,
                            },
                        },
                    },
                },
            },
            where: whereCondition,
            skip,
            take: limit,
            orderBy: sortBy && sortOrder
                ? {
                    [sortBy]: sortOrder,
                }
                : { createdAt: "desc" },
        });
        const total = await tx.order.count({
            where: whereCondition,
        });
        const users = await tx.order.groupBy({
            by: ["customerId"],
            where: whereCondition,
        });
        const completeCount = await tx.order.count({
            where: {
                ...whereCondition,
                status: "DELIVERED",
            },
        });
        return { data, total, totalUsers: users.length, completeCount };
    });
    return {
        meta: {
            totalUsers: result.totalUsers,
            completeCount: result.completeCount,
            page,
            limit,
            total: result.total,
            totalPage: Math.ceil(result.total / limit),
        },
        data: result.data,
    };
};
export const adminServices = {
    getAllUsers,
    updateUser,
    createCategory,
    getAllOrders,
};
//# sourceMappingURL=admin.service.js.map