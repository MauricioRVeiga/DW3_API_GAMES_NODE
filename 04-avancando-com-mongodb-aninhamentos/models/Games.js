import mongoose from "mongoose";

// CRIANDO UM DOCUMENTO ANINHADO
const descriptonSchema = new mongoose.Schema({
    genre: String,
    platform: String,
    rating: String
});

const gameSchema = new mongoose.Schema({

    title: String,
    year: Number,
    price: Number,
    description: descriptonSchema
});

const Game = mongoose.model('Game', gameSchema);

export default Game;