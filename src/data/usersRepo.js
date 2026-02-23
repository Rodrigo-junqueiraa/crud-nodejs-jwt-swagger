let users = [];
let nextUserId = 1;

function create({ name, email, password }) {
  const user = {
    id: nextUserId++,
    name,
    email,
    password,
  };
  users.push(user);
  return user;
}

function findByEmail(email) {
  return users.find((u) => u.email === email);
}

module.exports = {
  create,
  findByEmail,
};
