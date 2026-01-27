import { prisma } from "../../lib/prisma";

const createProfile = async (userId: string, data: any) => {
  return prisma.providerProfile.create({
    data: { ...data, userId },
  });
};

const addMeal = async (providerId: string, data: any) => {
  return prisma.meal.create({
    data: { ...data, providerId },
  });
};

export const providerServices = {
  createProfile,
  addMeal,
};
