const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  // 1) Vai pegar o header Authorization
  const authHeader = req.headers.authorization;

  // Se não veio, já bloqueia
  if (!authHeader) {
    return res.status(401).json({ message: "Missing token" });
  }

  // 2) formato esperado: "Bearer TOKEN"
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  // 3) validar token com a mesma chave usada no login
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // 4) guardar info do usuário para usar depois
    req.user = payload;

    // 5) deixa a requisição seguir
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;
