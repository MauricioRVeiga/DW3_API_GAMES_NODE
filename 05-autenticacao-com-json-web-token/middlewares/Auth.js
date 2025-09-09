import jwt from "jsonwebtoken";
import userController from "../controllers/userController.js"; //verificar se o segredo é válido

// FUNÇÃO de autenticação para verificar se o usuário que está enviando o token se ele [é valido]

const Authorization = (req, res, next) => {
  const authToken = req.headers["authorization"]; //pegando o token do cabeçalho da requisição
  if (authToken != undefined) {
    next();
  } else {
    res.status(401).json({ error: "Token inválido ou não enviado." });
  }
};

export default { Authorization };
