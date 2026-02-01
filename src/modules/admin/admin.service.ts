import { UserWhereInput } from "./../../../generated/prisma/models/User";
//* Users

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

const getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      customer: true,
      items: {
        include: {
          meal: true,
        },
      },
    },
  });
};

export const adminServices = {
  getAllUsers,
  updateUser,
  createCategory,
  getAllOrders,
};
