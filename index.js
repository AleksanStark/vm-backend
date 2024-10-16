const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRouter = require("./authRouter");
const cors = require("cors");
const pino = require("pino-http");

const PORT = process.env.PORT || 5001;
dotenv.config();
const app = express();
app.use(express.json());
app.use(pino());
app.use(cors());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PWD}@cluster0.zlhfuqf.mongodb.net/${process.env.MONGO_DB_NAME}`
    );
    app.listen(PORT, () => console.log(`server runnig on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
