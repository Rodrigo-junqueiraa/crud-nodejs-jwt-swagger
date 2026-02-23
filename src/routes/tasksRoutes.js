const express = require("express");
const router = express.Router();

const tasksRepo = require("../data/tasksRepo");

// GET /tasks (lista do usuário logado)
router.get("/", (req, res) => {
  const userId = req.user.sub;
  const tasks = tasksRepo.listByUser(userId);
  return res.json(tasks);
});

const AppError = require("../utils/AppError");

// GET /tasks/:id (buscar do usuário logado)
router.get("/:id", (req, res) => {
  const userId = req.user.sub;
  const id = Number(req.params.id);

  const task = tasksRepo.findByIdForUser(id, userId);

  if (!task) {
    throw new AppError("Task not found", 404);
  }

  return res.json({
    success: true,
    data: task,
  });
});

// POST /tasks (criar para o usuário logado)
router.post("/", (req, res) => {
  const userId = req.user.sub;
  const { title } = req.body || {};

  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return res.status(400).json({ error: "title is required" });
  }

  const createdTask = tasksRepo.create({ title: title.trim(), userId });
  return res.status(201).json(createdTask);
});

// PUT /tasks/:id (update rigoroso)
router.put("/:id", (req, res) => {
  const userId = req.user.sub;
  const id = Number(req.params.id);

  if (!req.body) {
    return res.status(400).json({ message: "Request body is required" });
  }
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "No data provided for update" });
  }

  const { title, done } = req.body;
  const hasValidField =
    (typeof title === "string" && title.trim().length > 0) ||
    typeof done === "boolean";

  if (!hasValidField) {
    return res.status(400).json({
      message:
        "Provide at least one valid field: title (string) or done (boolean)",
    });
  }

  const updatedTask = tasksRepo.updateForUser(id, userId, req.body);
  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json(updatedTask);
});

// DELETE /tasks/:id
router.delete("/:id", (req, res) => {
  const userId = req.user.sub;
  const id = Number(req.params.id);

  const removed = tasksRepo.removeForUser(id, userId);
  if (!removed) {
    return res.status(404).json({ message: "Task not found" });
  }

  // 204: sucesso sem corpo
  return res.status(204).send();
});

module.exports = router;
