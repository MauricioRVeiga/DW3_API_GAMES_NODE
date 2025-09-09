import express from "express";
const gameRoutes = express.Router();
import gameController from "../controllers/gameController.js";
// Importando o middleware 
import Auth from "../middlewares/Auth.js";

// a camada de routes será responsável por definir as rotas da aplicação
// ENDPOINT PARA LISTASR OS JOGOS
gameRoutes.get("/games", gameController.getAllGames);

// ENDPOINT PARA CADASTRAR OS JOGOS
gameRoutes.post("/games", Auth.Authorization ,gameController.createGame);

//// ENDPOINT PARA ALTERAR JOGOS// ENDPOINT PARA ALTERAR JOGOS
gameRoutes.put("/games/:id", Auth.Authorization ,gameController.updateGame);

/// ENDPOINT PARA LISTAR UM UNICO JOGO
gameRoutes.get("/games/:id", Auth.Authorization ,gameController.getOneGame);

// ENDPOINT PARA DELETAR OS JOGOS
gameRoutes.delete("/games/:id", Auth.Authorization ,gameController.deleteGame);

export default gameRoutes;