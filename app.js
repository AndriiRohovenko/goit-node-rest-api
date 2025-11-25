import "dotenv/config";

import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";
import express from "express";
import cors from "cors";
import connectDB from "./db/connection.js";
import syncDB from "./db/sync.js";

import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

app.use(notFoundHandler);
app.use(errorHandler);
await syncDB();
await connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
