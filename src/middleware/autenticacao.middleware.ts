import type { Request, Response, NextFunction } from "express";
import { verificarToken } from "./jwt.middleware.js";
import { buscarUsuarioService } from "../modules/services/usuario.service.js";

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

export async function autorizacaoSuperAdmin(req: Request, res: Response, next: NextFunction){
    const usuario_id = res.locals.usuario.id;

    if(!Number.isInteger(usuario_id) || usuario_id <= 0){
        return res.status(403).json({
            mensagem: "Usuario não autenticado, verifique as informações e tente novamente."
        })
    };

    const usuario = await buscarUsuarioService(usuario_id);

    if(!usuario){
        return res.status(403).json({
            mensagem: "Usuario não localizado, verifique as informações e tente novamente."
        });
    }

    if(usuario.tipo !== "superAdmin"){
        return res.status(403).json({
            mensagem: "Você não possui permissão para realizar esta operação."
        })
    }

    next();
}