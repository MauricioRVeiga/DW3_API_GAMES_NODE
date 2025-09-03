import Game from "../models/Games.js";

//services conterá os metodos de manipulação do banco

class gameService {
  //Busca registros no db
  async getAll() {
    try {
      const games = await Game.find();
      return games;
    } catch (error) {
      console.log(error);
    }
    ç;
  }

  async Create(title, year, price, description) {
    try {
      const newGame = new Game({
        title,
        year,
        description,
        price,
      });
      await newGame.save();
    } catch (error) {
      console.log(error);
    }
  }
  //deletando  banco
  async Delete(id) {
    try {
      await Game.findByIdAndDelete(id);
      console.log(`Game com id: ${id} foi deletado`);
    } catch {
      error;
    }
    {
      console.log(error);
    }
  }
  async Update(id, title, year, price, description) {
    try {
    const game = await Game.findByIdAndUpdate(
        id, 
        {
        title,
        year,
        price,
        description
      },
      {new: true}
    );
      console.log(`dados de game de ${id} alterando com sucesso`);
    } catch {
      error;
    }
    {
      console.log(error);
    }
  }
  //listando registro unico
  async getOne() {
    try {
      const game = await Game.findOne({ _id: id });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new gameService();
