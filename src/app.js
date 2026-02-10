const express = require("express");
const tasksRoutes = require("./routes/tasksRoutes");

const app = express();

app.use(express.json());
app.use("/tasks", tasksRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

module.exports = app;
