import express from "express";
import mongoose from "mongoose";
const app = express();
import Game from "./models/Games.js";


//configurando o express para aceitar JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//iniciando a conexão com o banco de dados MongoDB
mongoose.connect("mongodb://localhost:27017/api-thegames");

//criando um retorno da api
app.get("/", async (req, res) => {
  try {
    const games = await Game.find()
    res.status(200).json({games: games}); //Código 200 : Ok
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Erro ao conectar ao banco de dados" })
  }
});

//rodando a api na porta 4000
const port = 4000;
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
