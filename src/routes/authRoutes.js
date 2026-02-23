const express = require("express");
const jwt = require("jsonwebtoken");
const usersRepo = require("../data/usersRepo");

const router = express.Router();

/**
 * POST /auth/register
 * body: { "name": "...", "email": "...", "password": "..." }
 */
router.post("/register", (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "name, email e password são obrigatórios" });
  }

  const existing = usersRepo.findByEmail(email);
  if (existing) {
    return res.status(409).json({ message: "Email já cadastrado" });
  }

  const user = usersRepo.create({ name, email, password });

  // Não vai devolver a senha do usuário, por segurança
  return res
    .status(201)
    .json({ id: user.id, name: user.name, email: user.email });
});

/**
 * POST /auth/login
 * body: { "email": "...", "password": "..." }
 * resp: { "token": "..." }
 */
router.post("/login", (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "email e password são obrigatórios" });
  }

  const user = usersRepo.findByEmail(email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  }

  const token = jwt.sign(
    { sub: user.id, email: user.email }, // payload (quem é)
    process.env.JWT_SECRET, // assinatura (segredo)
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }, // validade
  );

  return res.json({ token });
});

module.exports = router;
