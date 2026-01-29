//* Users

import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  return prisma.user.findMany({
    include: {
      ProviderProfile: true,
    },
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
const createCategory = async (name: string) => {
  const isExists = await prisma.category.findUnique({
    where: { name },
  });
  if (isExists) {
    throw new Error("Category already exists");
  }
  return await prisma.category.create({
    data: {
      name,
    },
  });
};


export const adminServices = {
  getAllUsers,
  updateUser,
  createCategory,
};
