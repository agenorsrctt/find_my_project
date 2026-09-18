import express from 'express'
import { gerarTabelas } from './database/init.js';
await gerarTabelas();
export const app = express();
app.use(express.json());