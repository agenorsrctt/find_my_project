import express from 'express';
import {
    criarProjetoController,
    alterarProjetoController,
    deletarProjetoController,
    buscarProjetoController,
    listarProjetosController
} from "../controllers/projetos.controller.js";
import { autenticacao } from '../../middleware/autenticacao.middleware.js';

const projetoRouter = express.Router();

projetoRouter.get("/:id", buscarProjetoController);
projetoRouter.get("/", listarProjetosController);
projetoRouter.post("/", autenticacao, criarProjetoController);
projetoRouter.patch("/:id", autenticacao, alterarProjetoController);
projetoRouter.delete("/:id", autenticacao, deletarProjetoController);

export default projetoRouter;