import { prisma } from "../../lib/prisma";

const getMeals = async () => {
  return await prisma.meal.findMany({
    include: {
      provider: true,
    },
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

const createOrder = async (
  userId: string,
  address: string,
  items: { mealId: string; qty: number }[]
) => {
  let total = 0;
  for (const item of items) {
    const meal = await prisma.meal.findUnique({
      where: {
        id: item.mealId,
      },
    });
    if (!meal) {
      throw new Error("Meal not found");
    }
    total += meal.price * item.qty;
  }
  const order = await prisma.$transaction(async (tx) => {
    const createOrder = await tx.order.create({
      data: {
        customerId: userId,
        address,
        total,
      },
    });
    const orderItemsData = items.map((item) => ({
      orderId: createOrder.id,
      mealId: item.mealId,
      qty: item.qty,
    }));

    await tx.orderItem.createMany({
      data: orderItemsData,
    });
    return createOrder;
  });
  return order;
};

const getMyOrder = async (userId: string) => {
  return prisma.order.findMany({
    where: {
      customerId: userId,
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

const createReview = async (
  userId: string,
  mealId: string,
  rating: number,
  comment: string
) => {
  const hasOrder = await prisma.order.findFirst({
    where: {
      customerId: userId,
      items: {
        some: {
          mealId,
        },
      },
    },
  });

  if (!hasOrder) {
    throw new Error("You must order the meal before reviewing");
  }

  return prisma.review.create({
    data: {
      userId,
      mealId,
      rating,
      comment,
    },
  });
};

const getOrderById = async (orderId: string, userId: string) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      customerId: userId,
    },
    include: {
      items: {
        include: {
          meal: true,
        },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  return order;
};

const createProfile = async (userId: string, data: any) => {
  const existingProfile = await prisma.providerProfile.findUnique({
    where: {
      userId,
    },
  });
  if (existingProfile) {
    throw new Error("Provider Profile i already exists");
  }

  const providerProfile = await prisma.providerProfile.create({
    data: {
      ...data,
      userId,
    },
  });

  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      role: "PROVIDER",
    },
  });
  return providerProfile;
};

export const customerServices = {
  getMeals,
  getMealById,
  createOrder,
  getMyOrder,
  createReview,
  getOrderById,
  createProfile
};
