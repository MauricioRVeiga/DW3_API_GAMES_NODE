import gameServices from "../services/gameServices.js";
import mongoose from "mongoose";

//função para listar jogos
const getAllGames = async (req, res) => {
  try {
    const games = await gameServices.getAll();
    res.status(200).json({ games: games }); //Código 200 : Ok - Req feito com sucesso
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

//função para cadastrar jogos
const createGame = async (req, res) => {
  try {
    const { title, year, price, description } = req.body;
    await gameServices.create(title, year, price, description);
    res.status(201).json({ message: "Jogo criado com sucesso!" }); //Código 201 : Created - Recurso criado com sucesso
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar jogo." });
  }
};

// função para deletar jogos
const deleteGame = async (req, res) => {
  try {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
      await gameServices.delete(id);
      res.sendStatus(204); //Código 204 : No Content - Requisição feita com sucesso, mas sem conteúdo para retornar
    } else {
      res.status(400).json({ error: "ID inválido" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

//função para alterar jogos
const updateGame = async (req, res) => {
  try {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
      const { title, year, price, description } = req.body;

      const game = await gameServices.update(
        id,
        title,
        year,
        price,
        description
      );
      res.status(200).json({ message: "Jogo atualizado com sucesso!" });
    } else {
      res.status(400).json({ error: "ID inválido" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// Função para buscar um único jogo

const getOneGame = async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const id = req.params.id;
      const game = await gameServices.getOne(id);
      if (!game) {
        res.status(404).json({ error: "O jogo não foi encontrado" }); // NOT FOUND - Recurso não encontrado
      } else {
        res.status(200).json({ game }); // OK - Requisição feita com sucesso
      }
    } else {
      res.status(400).json({ error: "ID inválido" }); // BAD REQUEST - Requisição inválida
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro interno do servidor" }); // ERRO INTERNO DO SERVIDOR
  }
};

export default { getAllGames, createGame, deleteGame, updateGame, getOneGame };
