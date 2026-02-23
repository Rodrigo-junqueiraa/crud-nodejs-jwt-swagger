const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
require("dotenv").config();

const tasksRoutes = require("./routes/tasksRoutes");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Rotas públicas
app.use("/auth", authRoutes);

// Rotas protegidas
app.use("/tasks", authMiddleware, tasksRoutes);

const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

module.exports = app;
