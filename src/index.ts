import express, { Express } from "express";
import UserRouter from "./router/user";
import AuthRouter from "./router/auth";
import { ExceptionHandler } from "./handler/exception-handler";
import dotenv from "dotenv";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./swagger/config";
import swaggerJSDoc from "swagger-jsdoc";
https: dotenv.config();

const app: Express = express();
const port = process.env.PORT;
mongoose.connect(process.env.DB_URI || "");
app.use(express.json());
app.use(express.urlencoded());
app.use(ExceptionHandler);

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/user", UserRouter);
app.use("/auth", AuthRouter);

app.listen(port, () => {
  console.log("서버가 실행되었습니다.");
});
