import { prisma } from "../../lib/prisma";





const createOrder = async (
  userId: string,
  address: string,
  items: { mealId: string; qty: number }[]
) => {
  if (!userId) {
    throw new Error("User not authenticated");
  }
  if (!address) {
    throw new Error("Delivery address is required");
  }

  if (items.length === 0) {
    throw new Error("No items provided");
  }

  for (const item of items) {
    if (item.qty <= 0) {
      throw new Error("Quantity must be at least 1");
    }
  }

  /* Fetch all meals */
  const mealIds = items.map((i) => i.mealId);

  const meals = await prisma.meal.findMany({
    where: {
      id: { in: mealIds },
    },
    select: {
      id: true,
      price: true,
      providerId: true,
      name: true,
    },
  });

  if (meals.length !== items.length) {
    throw new Error("Some meals are not found");
  }

  /* order from Single provider */
  if (meals.length === 0) {
    throw new Error("No meals found");
  }
  const providerId = meals[0]?.providerId;
  const multipleProvider = meals.some((m) => m.providerId !== providerId);
  if (multipleProvider) {
    throw new Error("You can only order from One restaurant at a time");
  }

  /* Total price */
  let total = 0;
  const orderItems = items.map((item) => {
    const meal = meals.find((m) => m.id === item.mealId)!;
    const price = meal.price * item.qty;
    total += price;

    return {
      mealId: meal.id,
      qty: item.qty,
      price: meal.price,
    };
  });

  /* Transaction */
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.create({
      data: {
        customerId: userId,
        providerId,
        address,
        total,
      },
    });

    await tx.orderItem.createMany({
      data: orderItems.map((i) => ({
        ...i,
        orderId: order.id,
      })),
    });

    return tx.order.findUnique({
      where: {
        id: order.id,
      },
      include: {
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
    });
  });
};

const getMyOrder = async (userId: string) => {
  return prisma.order.findMany({
    where: {
      customerId: userId,
    },
    include: {
      items: {
        include: {
          meal: {
            select: {
              id: true,
              name: true,
              image: true,
              price: true,
            },
          },
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
  const hasOrder = await prisma.orderItem.findFirst({
    where: {
      mealId,
      order: {
        customerId: userId,
        status: "DELIVERED",
      },
    },
  });

  if (!hasOrder) {
    throw new Error("You must order the meal before reviewing");
  }

  const existing = await prisma.review.findFirst({
    where: {
      userId,
      mealId,
    },
  });

  if (existing) {
    throw new Error("You already reviewed this meal");
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

const getMealReview = async (mealId: string) => {
  return await prisma.review.findMany({
    where: { mealId },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
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

  if (!order || order.customerId !== userId) {
    throw new Error("Order not found");
  }

  return order;
};

const cancelOrder = async (orderId: string, userId: string) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });
  if (!order) {
    throw new Error("Order not found");
  }
  if (order.customerId !== userId) {
    throw new Error("Unauthorized");
  }
  if (order.status === "CANCELLED" || order.status === "DELIVERED") {
    throw new Error("Order can not be cancelled now!!");
  }
  return prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "CANCELLED",
    },
  });
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





export const getOrCreateCart = async (customerId: string) => {
  let cart = await prisma.cart.findUnique({
    where: { customerId },
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: { customerId },
    });
  }
  return cart;
};

export const addToCart = async (
  customerId: string,
  mealId: string,
  qty: number
) => {
  const cart = await getOrCreateCart(customerId);

  const meal = await prisma.meal.findUnique({
    where: {
      id: mealId,
    },
    select: {
      price: true,
    },
  });

  if (!meal) {
    throw new Error("Meal not found");
  }

  const isExist = await prisma.cartItem.findUnique({
    where: {
      cartId_mealId: {
        cartId: cart.id,
        mealId,
      },
    },
  });

  if (isExist) {
    return prisma.cartItem.update({
      where: {
        id: isExist.id,
      },
      data: {
        qty: isExist.qty + qty,
      },
    });
  }

  return await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      mealId,
      qty,
      price: meal.price,
    },
  });
};

export const getCart = async (customerId: string) => {
  return await prisma.cart.findUnique({
    where: { customerId },
    include: {
      items: {
        include: {
          meal: true,
        },
      },
    },
  });
};

export const removeFromCart = async (customerId: string, itemId: string) => {
  const cart = await getOrCreateCart(customerId);

  const item = await prisma.cartItem.findFirst({
    where: {
      id: itemId,
      cartId: cart.id,
    },
  });

  if (!item) {
    throw new Error("Item not found");
  }
  return await prisma.cartItem.delete({
    where: {
      id: itemId,
    },
  });
};

export const customerServices = {
  
  createOrder,
  getMyOrder,
  createReview,
  getMealReview,
  cancelOrder,
  getOrderById,
  createProfile,
  addToCart,
  getCart,
  removeFromCart,
};
