import { Request, Response } from "express";
import { profileService } from "./profile.service";

const getMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const result = await profileService.getMyProfile(userId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

const updateMyProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    

    const file = req.file as Express.Multer.File;

    const result = await profileService.updateMyProfile(userId, {
      name: req.body.name,
      phone: req.body.phone,
      image: file?.path,
    });

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const profileController = {
  getMyProfile,
  updateMyProfile,
};
