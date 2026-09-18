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

instituicaoRouter.post("/", criarInstituicaoController);

instituicaoRouter.put("/:id", alterarInstituicaoController);

instituicaoRouter.delete("/:id", deletarInstituicaoController);

export default instituicaoRouter;