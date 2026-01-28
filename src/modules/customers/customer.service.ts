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

export const customerServices = {
  getMeals,
  getMealById,
  createOrder,
  getMyOrder,
};
