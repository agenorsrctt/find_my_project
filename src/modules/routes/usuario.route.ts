import {
    criarUsuarioController,
    alterarUsuarioController,
    deletarUsuarioController,
    buscarUsuarioController,
    listarUsuarioController,
    listarAlunoController,
    buscarAlunoController
} from "../controllers/usuario.controller.js"
import express from 'express'

const usuarioRouter = express.Router();

usuarioRouter.get("/alunos", listarAlunoController)
usuarioRouter.get("/alunos/:id", buscarAlunoController);
usuarioRouter.get("/:id", buscarUsuarioController);
usuarioRouter.get("/", listarUsuarioController);
usuarioRouter.post("/", criarUsuarioController);
usuarioRouter.patch("/:id", alterarUsuarioController);
usuarioRouter.delete("/:id", deletarUsuarioController);

export default usuarioRouter;