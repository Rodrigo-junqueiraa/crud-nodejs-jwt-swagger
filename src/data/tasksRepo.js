let tasks = [];
let nextId = 1;

function list() {
  return tasks;
}

module.exports = {
  list,
  create,
};

function create({ title }) {
  const task = {
    id: nextId,
    title,
    title,
    done: false,
  };

  nextId = nextId + 1;
  tasks.push(task);
  return task;

  module.exports = {
    list,
    create,
    findById,
    update,
    remove,
  };

  function findById(id) {
    return tasks.find((t) => t.id === id);
  }

  function update(id, data) {
    const task = findById(id);
    if (!task) {
      return null;
    }

    if (typeof data.title === "string") {
      task.title = data.title;
    }
    if (typeof data.done === "boolean") {
      task.done = data.done;
    }
    return task;
  }
  function remove(id) {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) {
      return false;
    }
    tasks.splice(index, 1);
    return true;
  }
}
