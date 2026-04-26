import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\d+$/.test(val), {
      message: "Phone must contain only numbers",
    }),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;