import { Meal } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

const getAllProviders = async () => {
  return prisma.providerProfile.findMany();
};

const getProviderByUserId = async (userId: string) => {
  return prisma.providerProfile.findUnique({
    where: {
      userId: userId,
    },
  });
};

const createProfile = async (userId: string, data: any) => {
  return prisma.providerProfile.create({
    data: { ...data, userId },
  });
};

const addMeal = async (data: Meal, userId: string) => {
  const provider = await getProviderByUserId(userId);
  if (!provider) {
    throw new Error("Provider profile not found");
  }
  return prisma.meal.create({
    data: { ...data, providerId: provider.id },
  });
};

const updateMeal = async (mealId: string, userId: string, data: Meal) => {
  const provider = await getProviderByUserId(userId);
  if (!provider) {
    throw new Error("Provider profile not found");
  }

  const meal = await prisma.meal.findUnique({
    where: {
      id: mealId,
    },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  if (meal.providerId !== provider.id) {
    throw new Error("You are not able to update this meal");
  }
  return await prisma.meal.update({
    where: {
      id: mealId,
    },
    data,
  });
};

const deleteMeal = async (mealId: string, userId: string) => {
  const provider = await getProviderByUserId(userId);
  if (!provider) {
    throw new Error("Provider not found");
  }

  const meal = await prisma.meal.findUnique({
    where: {
      id: mealId,
    },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  if (userId !== provider.id) {
    throw new Error("You are not able to delete this meal");
  }

  return await prisma.meal.delete({
    where: {
      id: mealId,
    },
  });
};

const getProviderOrders = async (userId: string) => {
  const provider = await getProviderByUserId(userId);
  if (!provider) {
    throw new Error("Provider profile is not found");
  }
  return prisma.order.findMany({
    where: {
      items: {
        some: {
          meal: {
            providerId: provider.id,
          },
        },
      },
    },
    include: {
      items: {
        include: {
          meal: true,
        },
      },
    },
  });
};

export const providerServices = {
  getAllProviders,
  createProfile,
  addMeal,
  updateMeal,
  deleteMeal,
  getProviderOrders
};
