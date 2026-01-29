const express = require("express");
const app = express();

app.use(express.json());
app.get("/health", (req, res) => {
  return res.json({ status: "OK" });
});

module.exports = { app };
