import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma.js";
import { oAuthProxy } from "better-auth/plugins";
import { Role } from "../generated/enums.js";
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
        ? process.env.NEXT_PUBLIC_BACKEND_URL
        : "https://food-hub-server-cyan.vercel.app",
    trustedOrigins: [process.env.APP_URL],
    session: {
        cookieCache: {
            enabled: true,
            maxAge: 10,
        },
    },
    user: {
        additionalFields: {
            role: { type: "string", defaultValue: Role.CUSTOMER },
            phone: { type: "string" },
            status: { type: "string", defaultValue: "ACTIVE" },
        },
    },
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    advanced: {
        cookies: {
            session_token: {
                name: "session_token",
                attributes: {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                },
            },
            state: {
                name: "oAuth_token",
                attributes: {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                },
            },
        },
    },
    plugins: [oAuthProxy()],
});
//# sourceMappingURL=auth.js.map