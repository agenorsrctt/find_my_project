import { autenticacao, autorizacaoSuperAdmin } from "../../middleware/autenticacao.middleware.js";
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
instituicaoRouter.post("/", autenticacao, autorizacaoSuperAdmin, criarInstituicaoController);
instituicaoRouter.put("/:id", autenticacao, autorizacaoSuperAdmin, alterarInstituicaoController);
instituicaoRouter.delete("/:id", autenticacao, autorizacaoSuperAdmin, deletarInstituicaoController);

export default instituicaoRouter;