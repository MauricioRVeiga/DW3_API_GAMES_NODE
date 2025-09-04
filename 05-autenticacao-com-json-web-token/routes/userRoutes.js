import express from "express";
const userRoutes = express.Router();
import userController from "../controllers/userController.js";

// Rota para criar um novo usuário
userRoutes.post("/user", userController.createUser);

// Rota para logar um usuário
userRoutes.post("/login", userController.loginUser);

export default userRoutes;