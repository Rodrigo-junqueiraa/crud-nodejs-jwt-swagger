const express = require("express");
const router = express.Router();
const tasksRepo = require("../data/tasksRepo");

router.get("/", (req, res) => {
  const tasks = tasksRepo.list();
  return res.json(tasks);
});

router.post("/", (req, res) => {
  const { title } = req.body || {};

  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }

  const createdTask = tasksRepo.create({ title });

  return res.status(201).json(createdTask);
});

module.exports = router;
