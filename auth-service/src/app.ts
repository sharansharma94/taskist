import express from "express";
import mongoose from "mongoose";
import authRoute from "./auth.route.ts";
import config from "./config/database.ts";

// Use environment variable or default MongoDB URL
const MONGO_URL = config.url;
console.log(`Connecting to ${MONGO_URL}`);


mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    Deno.exit(1);
  });

const app = express();
app.use(express.json());
app.use("/api/auth", authRoute);

const port = Deno.env.get("PORT") || "3000";

app.listen(port, () => { console.log(`Listening on port ${port}`);
});
