import userServices from "../services/userServices.js";
import jwt from "jsonwebtoken";

const JWTSecret = "paralelepido"; // Recomenda-se usar variável de ambiente

// função para criar um novo usuário

const createUser = async (req, res) => {
  try {
    // Coletando os dados do corpo da requisição
    const { name, email, password } = req.body;
    await userServices.Create(name, email, password);
    res.status(201).json({ success: "Usuário criado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar usuário." });
  }
};

// Função para realizar o login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // buscando o usuário pelo email
    const user = await userServices.getOne(email);
    // se o usuario for encontrado
    if (user != undefined) {
      // Aqui seria interessante validar a senha, se o método getOne não faz isso
      if (user.password == password) {
        // Gerando o token de autenticação
        jwt.sign(
          { id: user.id, email: user.email },
          JWTSecret,
          { expiresIn: "48h" },
          (error, token) => {
            if (error) {
              res.status(400).json({
                error:
                  "Falha interna. Não foi possível gerar o token de autenticação",
              });
            } else {
              res.status(200).json({ token });
            }
          }
        );
        // Senha incorreta
      } else {
        res.status(401).json({ error: "Credenciais inválidas." });
      }
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar login." });
  }
};

export default { createUser, loginUser, JWTSecret };
