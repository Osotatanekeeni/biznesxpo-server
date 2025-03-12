import mongoose from "mongoose";
import { url } from "./config/db.config";
import createServer from "./server";

const listenPort =  8000;

mongoose
  .connect(url)
  .then(() => {
    const app = createServer();
    app.listen(listenPort, () => {
      console.log(`App currently running at port ${listenPort}`);
    });
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log("Error connecting to the database");
    console.error(error);
  });
