import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";
import { providerRouter } from "../modules/providers/providers.routes";
import { customerRouter } from "../modules/customers/customer.routes";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_URl || "http://localhost:3000",
    credentials: true,
  })
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/", providerRouter);
app.use('/', customerRouter)

app.get("/", async (req, res) => {
  res.send("this is assignment4");
});

export default app;
