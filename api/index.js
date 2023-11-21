import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// Connecting to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .catch((err) => {
    console.log(err);
  });

// App Listen

const app = express();
app.listen(3000, () => {
  console.log(`Server is runnig on port 3000!`);
});
