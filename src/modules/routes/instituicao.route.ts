import { autenticacao } from "../../middleware/autenticacao.middleware.js";
import {
    criarInstituicaoController,
    alterarInstituicaoController,
    deletarInstituicaoController,
    buscarInstituicaoController,
    listarInstituicaoController
} from "../controllers/instituicao.controller.js"
import express from 'express';

const instituicaoRouter = express.Router();

instituicaoRouter.get("/", listarInstituicaoController);
instituicaoRouter.get("/:id", buscarInstituicaoController);
instituicaoRouter.post("/", autenticacao, criarInstituicaoController);
instituicaoRouter.put("/:id", autenticacao, alterarInstituicaoController);
instituicaoRouter.delete("/:id", autenticacao, deletarInstituicaoController);

export default instituicaoRouter;