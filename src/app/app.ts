import express, { Application } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.all('/api/auth/*splat', toNodeHandler(auth));

app.get('/', async(req, res)=>{
    res.send('this is assignment4')
})

export default app