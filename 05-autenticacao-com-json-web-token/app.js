import express from "express";
import mongoose from "mongoose";
const app = express();

//Importando os models para criar os documentos no banco
import Game from "./models/Games.js";
import User from "./models/User.js";

//Importando as rotas de Games
import gameRoutes from "./routes/gameRoutes.js";

//Importando as rotas de User
import userRoutes from "./routes/userRoutes.js";

//configurando o express para aceitar JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", gameRoutes);
app.use("/", userRoutes);

//iniciando a conexão com o banco de dados MongoDB
mongoose.connect("mongodb://localhost:27017/api-thegames");

//rodando a api na porta 4000
const port = 4000;
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
