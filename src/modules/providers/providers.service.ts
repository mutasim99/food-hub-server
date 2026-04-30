import { deleteFileFromCloudinary } from "../../config/cloudinary.config";
import { Meal, OrderStatus } from "../../generated/client";
import { prisma } from "../../lib/prisma";
import { ICreateMealPayload } from "./provider.interface";

const getProviderByUserId = async (userId: string) => {
  return prisma.providerProfile.findUnique({
    where: {
      userId: userId,
    },
  });
};

const getMyMeals = async (userId: string) => {
  const provider = await getProviderByUserId(userId);
  if (!provider) {
    throw new Error("You are not authorized");
  }
  const meals = await prisma.meal.findMany({
    where: {
      providerId: provider.id,
    },
    include: {
      category: true,
    },
  });
  return meals || [];
};

const addMeal = async (userId: string, payload: ICreateMealPayload) => {
  const provider = await getProviderByUserId(userId);
  if (!provider) {
    await deleteFileFromCloudinary(payload.image);
    throw new Error("Provider profile not found");
  }
  try {
    const result = await prisma.meal.create({
      data: {
        name: payload.name,
        description: payload.description,
        price: payload.price,
        image: payload.image,
        categoryId: payload.categoryId,
        providerId: provider.id,
      },
    });
    return result;
  } catch (error) {
    console.log("failed to create meal", error);
    await deleteFileFromCloudinary(payload.image);
  }
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

  const updateData = {
    name: data.name,
    description: data.description,
    price: data.price,
    image: data.image,
    categoryId: data.categoryId,
  };
  return await prisma.meal.update({
    where: {
      id: mealId,
    },
    data: updateData,
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

  if (meal.providerId !== provider.id) {
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
  return await prisma.order.findMany({
    where: {
      providerId: provider.id,
    },
    include: {
      customer: {
        select: {
          name: true,
          email: true,
        },
      },
      items: {
        include: {
          meal: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const updateOrderStatus = async (
  orderId: string,
  userId: string,
  newStatus: OrderStatus
) => {
  const provider = await getProviderByUserId(userId);
  if (!provider) {
    throw new Error("Provider profile is not found");
  }
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      providerId: provider.id,
    },
  });

  if (!order) {
    throw new Error("Order not found or not authorized");
  }

  /* Locked order */
  if (order.status === "CANCELLED" || order.status === "DELIVERED") {
    throw new Error("This order can no longer be updated");
  }

  /* Status update */
  const flow: Record<OrderStatus, OrderStatus> = {
    PLACED: "PREPARING",
    PREPARING: "READY",
    READY: "DELIVERED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
  };

  const expectedNext = flow[order.status];

  if (newStatus !== expectedNext) {
    throw new Error(
      `Invalid transition.${order.status} -> ${newStatus} not allowed`
    );
  }

  return prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: newStatus,
    },
  });
};

export const providerServices = {
  getMyMeals,
  addMeal,
  updateMeal,
  deleteMeal,
  getProviderOrders,
  updateOrderStatus,
};
