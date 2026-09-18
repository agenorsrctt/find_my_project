import { app } from "./app.js";
const PORT: number = 3000;
app.listen(PORT, () => {
    console.log("Servido iniciado na porta "+ PORT);
});