import type { Request, Response } from "express";
import { loginService } from "../services/login.service.js";

export async function loginController(req: Request, res: Response) {
    try {

        const {email, senha} = req.body;
        
        const token = await loginService(email, senha);

        res.status(200).json({
            mensagem: "Login realizado com sucesso!",
            token
        })

    } catch (error) {

        if (error instanceof Error) {
            return res.status(500).json({
                mensagem: "Erro do servidor",
                error: error.message
            })
        }

        res.status(500).json({
            mensagem: "Erro do servidor",
        })

    }
}