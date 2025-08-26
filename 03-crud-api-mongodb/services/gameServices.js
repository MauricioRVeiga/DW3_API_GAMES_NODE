import Game from "../models/Games.js";

//O service será responsável por conter os métodos de manipulação do banco

class GameServices {
  // Buscando os registros do banco
async getAll() {
    try {
    const games = await Game.find();
    return games;
    } catch (error) {
    console.log(error);
    }
}
// Cadastrando registros no banco
async create(title, year, genre, platform, price) {
    try {
        const newGame = new Game({
            title,
            year,
            genre,
            platform,
            price,
        });
        await newGame.save(); //Save é o metodo do mongoose para salvar no banco
    } catch(error){
        console.log(error)
    }
}
}

export default new GameServices();
