import { prisma } from "../../lib/prisma";
import { deleteFileFromCloudinary } from "../../config/cloudinary.config";
import { UpdateProfilePayload } from "./profile.interface";

const getMyProfile = async (userId: string) => {
  return prisma.user.findUnique({
    where: { id: userId },
  });
};

const updateMyProfile = async (
  userId: string,
  payload: UpdateProfilePayload
) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }


  if (payload.image && user.image) {
    await deleteFileFromCloudinary(user.image);
  }

  return prisma.user.update({
    where: { id: userId },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.phone && { phone: payload.phone }),
      ...(payload.image && { image: payload.image }),
    } as any,
  });
};

export const profileService = {
  getMyProfile,
  updateMyProfile,
};
