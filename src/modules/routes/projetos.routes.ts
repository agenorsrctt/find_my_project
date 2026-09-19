import express from 'express';
import {
    criarProjetoController,
    alterarProjetoController,
    deletarProjetoController,
    buscarProjetoController,
    listarProjetosController
} from "../controllers/projetos.controller.js";

const projetoRouter = express.Router();

projetoRouter.get("/:id", buscarProjetoController);
projetoRouter.get("/", listarProjetosController);
projetoRouter.post("/", criarProjetoController);
projetoRouter.patch("/:id", alterarProjetoController);
projetoRouter.delete("/:id", deletarProjetoController);

export default projetoRouter;