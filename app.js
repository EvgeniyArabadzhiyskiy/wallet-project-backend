const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const cookieParser = require("cookie-parser")

const {
  authRouter,
  transactionsRouter,
  googleRouter,
} = require("./routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(express.json());
app.use(cookieParser())
app.use(cors());

// app.use(
//   cors({
//     origin: [`${process.env.CORS_URL}`, "https://example.com"], // Замените на ваш домен
//     credentials: true, // Разрешаем передавать куки
//   })
// );

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", `${process.env.CORS_URL}`)
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   // res.setHeader("Access-Control-Max-Age", "900000");
//   res.setHeader("Access-Control-Allow-Headers", "content-type");
//   res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );

//   next();
// });

app.use("/api/users", authRouter);
app.use("/api/transactions", transactionsRouter);
app.use("/api/auth-google", googleRouter);
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
