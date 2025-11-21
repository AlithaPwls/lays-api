import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); //voor lezen van .env bestand

const app = express();
app.use(cors());
app.use(express.json());

//import routes
import designRouter from "./routes/design.js";


// MONGO CONNECTIE
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// TEST ROUTE

app.get("/", (req, res) => {
  res.send("API is WOOOOOORKIIIIINGGGGGGG");
});

//echte route
app.use("/designs", designRouter);



app.listen(process.env.PORT || 3000, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
