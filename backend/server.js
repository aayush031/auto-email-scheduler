import dotenv from "dotenv";
dotenv.config(); 

import mongoose from "mongoose";
import app from "./src/app.js";
import { startScheduler } from "./src/cron/scheduler.js";



const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");


startScheduler();

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ DB Error:", err.message);
  });

  
