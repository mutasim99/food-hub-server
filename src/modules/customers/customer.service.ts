import { prisma } from "../../lib/prisma";

const getMeals = async () => {
  return await prisma.meal.findMany({
    include: {
      provider: true,
    },
  });
};

export const customerServices = {
  getMeals,
};
