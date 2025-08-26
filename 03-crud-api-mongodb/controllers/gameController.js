import gameServices from "../services/gameServices.js"

//função para listar jogos
const getAllGames = async (req, res) => {
    try {
        const games = await gameServices.getAll()
        res.status(200).json({ games : games }) //Código 200 : Ok - Req feito com sucesso
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro interno do servidor" })
    }
};

//função para cadastrar jogos
const createGame = async (req, res) => {
    try {
        const {title, year, genre, platform, price} = req.body
        await gameServices.create(title, year, genre, platform, price)
        res.sendStatus(201) //Código 201 : Created - Recurso criado com sucesso
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro interno do servidor" });
    }
};



export default { getAllGames, createGame }