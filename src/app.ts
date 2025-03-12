import mongoose from "mongoose";
import { url } from "./config/db.config";
import createServer from "./server";
const listenPort =  8000;

if (!url.dbUrl) {
  throw new Error("Database URL is not defined");
}

mongoose
  .connect(url.dbUrl)
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
