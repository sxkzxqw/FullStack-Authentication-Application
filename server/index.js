import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import 'dotenv/config'
import mongoose from "mongoose";
import router from "./router/index.js";
import errorMiddleware from "./middlewares/error-middleware.js";

const app = express();
const PORT = process.env.PORT || 8000;
const dbUrl = process.env.DB_URL || "";
const clientUrl = process.env.CLIENT_URL || "";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: clientUrl,
}));
app.use('/api', router);
app.use(errorMiddleware);

const startServer = async () => {
  try {
    await mongoose.connect(dbUrl);
    app.listen(PORT, () => {
      console.log(`server started on: http://localhost:${PORT}`);
    })
  } catch (error) {
    console.log(`ERROR OCCURED on start: ${error}`);
  }
}

startServer();