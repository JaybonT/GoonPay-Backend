import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("DB ERROR:", err));

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import txRoutes from "./routes/transactions.js";

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", txRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
