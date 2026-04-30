import { prisma } from "../../lib/prisma.js";
import { deleteFileFromCloudinary } from "../../config/cloudinary.config.js";
const getMyProfile = async (userId) => {
    return prisma.user.findUnique({
        where: { id: userId },
    });
};
const updateMyProfile = async (userId, payload) => {
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
        },
    });
};
export const profileService = {
    getMyProfile,
    updateMyProfile,
};
//# sourceMappingURL=profile.service.js.map