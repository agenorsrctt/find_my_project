import express from 'express'
import { gerarTabelas } from './database/init.js';
import instituicaoRouter from './modules/routes/instituicao.route.js';

await gerarTabelas();

const app = express();
app.use(express.json());

app.use("/instituicao", instituicaoRouter);
console.log("Rota instituição iniciada.");


console.log("App iniciado!");
export default app;