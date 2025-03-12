import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import express from "express";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";

export default function createServer() {
  const app = express();
  app.use(morgan("combined"));
  app.use(express.json());
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.get("/", (req, res) => {
    res.send("Welcome to Biznesxpo Server!");
  });

  // routes
  app.use("", authRoutes);
  app.use("/api/v1/users", userRoutes);

  return app;
}
