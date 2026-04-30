export interface UpdateProfilePayload {
    name: string;
    phone?: number;
    image?: string;
}
export interface ProfileResponse {
    id: string;
    name: string;
    email: string;
    image: string | null;
    phone: number | null;
    role: string | null;
    status: string | null;
    providerProfile?: {
        id: string;
        shopName: string;
        address: string;
        phone: string;
        image: string;
    } | null;
}
//# sourceMappingURL=profile.interface.d.ts.map