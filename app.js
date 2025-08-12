import express from "express";
const app = express();

//configurando o express para aceitar JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//criando um retorno da api
app.get("/", (req, res) => {
  const games = [
    {
      title: "Diablo III",
      year: 2012,
      genre: "Action RPG",
      platform: "PC",
      price: 0,
    },
    {
      title: "The Witcher 3",
      year: 2015,
      genre: "Action RPG",
      platform: "PC",
      price: 0,
    },
    {
      title: "Stardew Valley",
      year: 2016,
      genre: "Simulation",
      platform: "PC",
      price: 0,
    },
  ];
  res.json(games);
});

//rodando a api na porta 4000
const port = 4000;
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
