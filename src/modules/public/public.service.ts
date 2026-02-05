import { prisma } from "../../lib/prisma";

const getMeals = async () => {
  return await prisma.meal.findMany({
    include: {
      provider: true,
    },
  });
};

const getPopularMeals = async () => {
  return prisma.meal.findMany({
    include: {
      provider: {
        select: {
          shopName: true,
        },
      },
    },
    take: 8,
  });
};

const getMealById = async (mealId: string) => {
  return await prisma.meal.findUnique({
    where: {
      id: mealId,
    },
    include: {
      provider: true,
      review: true,
    },
  });
};

const getAllCategories = async () => {
  return await prisma.category.findMany();
};

const getFeaturedProviders = async () => {
  return await prisma.providerProfile.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
      Meal: {
        select: {
          name: true,
        },
      },
    },
    take: 6,
  });
};

export const publicService = {
  getMeals,
  getPopularMeals,
  getMealById,
  getAllCategories,
  getFeaturedProviders,
};
