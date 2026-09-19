import express from 'express'
import { gerarTabelas } from './database/init.js';
import instituicaoRouter from './modules/routes/instituicao.route.js';
import usuarioRouter from './modules/routes/usuario.route.js';

await gerarTabelas();

const app = express();
app.use(express.json());

app.use("/instituicao", instituicaoRouter);
console.log("Rota instituição iniciada.");

app.use("/usuarios", usuarioRouter);
console.log("Rota usuarios iniciada.");


console.log("App iniciado!");
export default app;