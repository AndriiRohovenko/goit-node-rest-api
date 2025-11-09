import contactsRouter from "./routes/contactsRouter.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({
    code: 404,
    message: "Not Found",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    code: status,
    message: err.message,
    data: status === 500 ? "Internal Server Error" : "Client Error",
  });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server running. Use our API on port: ${PORT}`);
});
