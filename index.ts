import express, { type Express } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.dev" });
import postRoutes from "./routes/postRoutes.ts";
import commentRoutes from "./routes/commentRoutes.ts";

const app = express();

const intApp = () => {
  return new Promise<Express>((resolve, reject) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use("/post", postRoutes);
    app.use("/comment", commentRoutes);

    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) {
      console.error("MONGODB_URI is not defined in the environment variables.");
      return reject(new Error("MONGODB_URI is not defined"));
    }

    mongoose
      .connect(dbUri)
      .then(() => resolve(app))
      .catch(reject);

    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("Connected to MongoDB"));
  });
};

const PORT = Number(process.env.PORT ?? 3000);

intApp()
  .then((app) => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to init app:", err);
    process.exit(1);
  });

export default intApp;
