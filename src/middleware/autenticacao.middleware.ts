import type { Request, Response, NextFunction } from "express";
import { verificarToken } from "./jwt.middleware.js";

export async function autenticacao(req: Request, res: Response, next: NextFunction) {

    const autenticacao = req.headers.authorization;
    if (!autenticacao) {
        return res.status(401).json({
            mensagem: "Autorização não informada."
        });
    };

    const [tipo, token] = autenticacao.split(" ");

    if (!token || !tipo) {
        return res.status(401).json({
            mensagem: "Autenticador inválido, tente novamente."
        })
    }

    if (tipo !== "Bearer") {
        return res.status(401).json({
            mensagem: "Tipo de autenticação inválido."
        });
    }

    try {
        const usuario = await verificarToken(token);
        res.locals.usuario = usuario;
    } catch {
        return res.status(401).json({
            mensagem: "Token inválido ou expirado."
        });
    }

    return next();
}