import express from "express";
import cors from "cors";
import messageRoutes from "./routes/messageRoutes.js";
import { startScheduler } from "./cron/scheduler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/messages", messageRoutes);

startScheduler();

export default app;
