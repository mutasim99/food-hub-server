//* Users

import { prisma } from "../../lib/prisma";
import { UserRole } from "../../type/UserRole";

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

export const adminServices = {
  getAllUsers,
  updateUser,
};
