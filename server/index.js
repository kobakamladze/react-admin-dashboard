import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import clientRouter from "./routes/clientRoutes.js";
import generalRouter from "./routes/generalRoutes.js";
import managmentRouter from "./routes/managmentRoutes.js";
import salesRouter from "./routes/salesRoutes.js";

// Configurating basic middlewares
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes configuration
app.use("/client", clientRouter);
app.use("/general", generalRouter);
app.use("/managment", managmentRouter);
app.use("/sales", salesRouter);

// Mongoose configuration
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() =>
    // Serevr setup
    app.listen(PORT, () => console.log(`listening on PORT ${PORT}...`))
  )
  .catch((e) => console.log(e));
