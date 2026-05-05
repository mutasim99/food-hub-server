import { OrderWhereInput } from "../../generated/models";
import { UserWhereInput } from "../../generated/models/User";
import { prisma } from "../../lib/prisma";

const getAllUsers = async ({
  search,
  page,
  limit,
  sortBy,
  sortOrder,
  skip,
}: {
  search: string | undefined;
  page: number;
  limit: number;
  sortBy: string | undefined;
  sortOrder: string | undefined;
  skip: number;
}) => {
  const andCondition: UserWhereInput[] = [];
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
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : { createdAt: "desc" },
  });
};

const updateUser = async (
  userId: string,
  data: {
    role?: "ADMIN" | "PROVIDER" | "CUSTOMER";
    status?: "ACTIVE" | "INACTIVE";
  }
) => {
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
const createCategory = async (name: string, image: string) => {
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

const getAllOrders = async ({
  search,
  page,
  limit,
  sortBy,
  sortOrder,
  skip,
}: {
  search: string | undefined;
  page: number;
  limit: number;
  sortBy: string | undefined;
  sortOrder: string | undefined;
  skip: number;
}) => {
  const andCondition: OrderWhereInput[] = [];
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
      orderBy:
        sortBy && sortOrder
          ? {
              [sortBy]: sortOrder,
            }
          : { createdAt: "desc" },
    });

    const total = await tx.order.count({
      where: whereCondition,
    });
    return { data, total };
  });
  return {
    meta: {
      page,
      limit,
      total: result.total,
      totalPage : Math.ceil(result.total / limit),
    },
    data:result.data
  };
};

export const adminServices = {
  getAllUsers,
  updateUser,
  createCategory,
  getAllOrders,
};
