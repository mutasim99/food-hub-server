import { prisma } from "../lib/prisma.js";
import { UserRole } from "../middleware/auth.middleware.js";
const seedAdmin = async () => {
    try {
        const adminData = {
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            role: UserRole.ADMIN,
            password: process.env.ADMIN_PASS,
        };
        const existingUser = await prisma.user.findUnique({
            where: {
                email: adminData.email,
            },
        });
        if (existingUser) {
            throw new Error("Admin is already exists");
        }
        const signUpAdmin = await fetch("http://localhost:5000/api/auth/sign-up/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                origin: "http://localhost:5000",
            },
            body: JSON.stringify(adminData),
        });
        console.log(signUpAdmin);
        if (signUpAdmin.ok) {
            await prisma.user.update({
                where: {
                    email: adminData.email,
                },
                data: {
                    emailVerified: true,
                },
            });
        }
        console.log(signUpAdmin);
    }
    catch (error) {
        console.log(error);
    }
};
seedAdmin();
//# sourceMappingURL=seedAdmin.js.map