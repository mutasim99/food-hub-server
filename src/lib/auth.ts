import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  trustedOrigins: [process.env.APP_URL!],

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 10,
    },
  },

  advanced: {
    cookiePrefix: "better-auth",
    useSecureCookies: process.env.NODE_ENV === "production",
    crossSubDomainCookies: {
      enabled: false,
    },
    disableCSRFCheck: true,
  },

  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "CUSTOMER" },
      phone: { type: "number" },
      status: { type: "string", defaultValue: "ACTIVE" },
    },
  },

  emailAndPassword: {
    enabled: true,
  },
 
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
});
