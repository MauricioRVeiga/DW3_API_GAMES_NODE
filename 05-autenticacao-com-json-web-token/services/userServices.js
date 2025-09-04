import User from "../models/User.js";

class UserServices {
  // Método para criar um novo usuário
  async Create(name, email, password) {
    try {
      const newUser = new User({
        name,
        email,
        password,
      });
      await newUser.save();
      return { status: 201, message: "Usuário criado com sucesso!" };
    } catch (error) {
      return { status: 500, message: "Erro ao criar usuário." };
    }
  }
  // Método para buscar um usuário pelo email
  async getOne(email) {
    try {
      const user = await User.findOne({ email: email });
      return user;
    } catch (error) {
      comsole.log(error);
    }
  }
}

export default new UserServices();
