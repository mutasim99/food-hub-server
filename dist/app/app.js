import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { providerRouter } from "../modules/providers/providers.routes.js";
import { customerRouter } from "../modules/customers/customer.routes.js";
import { adminRouter } from "../modules/admin/admin.routes.js";
import { publicRouter } from "../modules/public/public.routes.js";
import { ProfileRouter } from "../modules/profile/profile.routes.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL || "https://foodhub-client-bay.vercel.app",
    credentials: true,
}));
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use("/", providerRouter);
app.use("/", customerRouter);
app.use("/", adminRouter);
app.use("/", publicRouter);
app.use("/", ProfileRouter);
app.get("/", async (req, res) => {
    res.send("this is assignment4");
});
export default app;
//# sourceMappingURL=app.js.map