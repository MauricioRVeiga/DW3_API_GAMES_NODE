import userServices from "../services/userServices.js";

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
    const user = await userServices.getOne(email);
    if (user != undefined) {
      // Aqui seria interessante validar a senha, se o método getOne não faz isso
      // if (user.password !== password) {
      //     return res.status(401).json({ message: "Senha inválida." });
      // }
      res.status(200).json({ message: "Login realizado com sucesso!" });
    } else {
      res.status(404).json({ message: "Usuário não encontrado." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar login." });
  }
};

export default { createUser, loginUser };
