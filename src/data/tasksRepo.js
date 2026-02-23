let tasks = [];
let nextId = 1;

function listByUser(userId) {
  return tasks.filter((t) => t.userId === Number(userId));
}

function create({ title, userId }) {
  const task = {
    id: nextId++,
    userId: Number(userId),
    title: title,
    done: false,
  };

  tasks.push(task);
  return task;
}

function findByIdForUser(id, userId) {
  return tasks.find((t) => t.id === Number(id) && t.userId === Number(userId));
}

function updateForUser(id, userId, data) {
  const task = findByIdForUser(id, userId);
  if (!task) return null;

  if (typeof data.title === "string" && data.title.trim().length > 0) {
    task.title = data.title;
  }
  if (typeof data.done === "boolean") {
    task.done = data.done;
  }

  return task;
}

function removeForUser(id, userId) {
  const index = tasks.findIndex(
    (t) => t.id === Number(id) && t.userId === Number(userId),
  );
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}

module.exports = {
  listByUser,
  create,
  findByIdForUser,
  updateForUser,
  removeForUser,
};
