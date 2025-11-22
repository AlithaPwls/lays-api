import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import designRoutes from "./routes/design.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import mongoose from "mongoose";


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());

app.use("/designs", designRoutes);
app.use("/auth", authRoutes);
app.use("/admin", adminRoutes);


const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


