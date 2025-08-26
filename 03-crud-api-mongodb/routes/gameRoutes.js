import express from "express";
const gameRoutes = express.Router();
import gameController from "../controllers/gameController.js";

// a camada de routes será responsável por definir as rotas da aplicação
// ENDPOINT PARA LISTASR OS JOGOS
gameRoutes.get("/games", gameController.getAllGames);

// ENDPOINT PARA CADASTRAR OS JOGOS
gameRoutes.post("/games", gameController.createGame);
export default gameRoutes;
