import { MealWhereInput } from "../../../generated/prisma/models";
import { prisma } from "../../lib/prisma";
import { MealFilterTypes } from "./public.types";

const getMeals = async (filters: MealFilterTypes) => {
  const meal: MealWhereInput = {};

  if (filters.categoryId) {
    meal.categoryId = filters.categoryId;
  }
  if (filters.providerId) {
    meal.providerId = filters.providerId;
  }

  if (filters.minPrice || filters.maxPrice) {
    meal.price = {};
    if (filters.minPrice !== undefined) {
      meal.price.gte = Number(filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      meal.price.lte = Number(filters.maxPrice);
    }
  }

  return await prisma.meal.findMany({
    where: meal,
    include: {
      provider: {
        select: {
          shopName: true,
          image: true,
        },
      },
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getPopularMeals = async () => {
  return prisma.meal.findMany({
    orderBy: {
      OrderItem: {
        _count: "desc",
      },
    },
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
      provider: {
        select: {
          id: true,
          shopName: true,
          image: true,
          address: true,
        },
      },
      review: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
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

const getAllProviders = async () => {
  return prisma.providerProfile.findMany({
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });
};
const getProviderById = async (providerId: string) => {
  return prisma.providerProfile.findUnique({
    where: { id: providerId },
    include: {
      Meal: {
        include: {
          category: true,
        },
      },
    },
  });
};

export const publicService = {
  getMeals,
  getPopularMeals,
  getMealById,
  getAllCategories,
  getFeaturedProviders,
  getAllProviders,
  getProviderById,
};
