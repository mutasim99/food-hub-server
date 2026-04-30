import { UpdateProfilePayload } from "./profile.interface";
export declare const profileService: {
    getMyProfile: (userId: string) => Promise<{
        role: import("../../generated/enums").Role;
        phone: string | null;
        status: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image: string | null;
    } | null>;
    updateMyProfile: (userId: string, payload: UpdateProfilePayload) => Promise<{
        role: import("../../generated/enums").Role;
        phone: string | null;
        status: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        emailVerified: boolean;
        name: string;
        image: string | null;
    }>;
};
//# sourceMappingURL=profile.service.d.ts.map