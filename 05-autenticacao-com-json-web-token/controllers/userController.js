import userServices from "../services/userServices.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config(); 
const JWTSecret = process.env.JWT_SECRET;

//importando o bcrypt para fazer o hash de senha
import bcrypt from "bcrypt";

// função para criar um novo usuário
const createUser = async (req, res) => {
  try {
    // Coletando os dados do corpo da requisição
    const { name, email, password } = req.body;
    // verificar se o usuário já existe
    const user = await userServices.getOne(email);
    // se não houve o usuario cadastrada 
    if (user == undefined) {
      // criando o hash da senha
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      //cadastrando o usuário
      await userServices.Create(name, email, hash);
    res.status(201).json({ success: "Usuário criado com sucesso!" });

    //se o usuario ja estiver cadastrado
    } else {
      res.status(409).json({ error: "Usuário já cadastrado." });
    }
    
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário." });
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
      // comparando hash de senha

      const correct = bcrypt.compareSync(password, user.password)
      // se a senha estiver correta
      if (correct) {
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
