export type Tipo = "superAdmin" | "responsavel" | "aluno" | "visitante";

export interface UsuarioDto {
    readonly id: number;
    nome: string;
    email: string;
    senha: string;
    tipo: Tipo;
    instituicao_id?: number;
    identificacao?: string;
    curso?: string;
};

export interface AlterarUsuarioDto {
    readonly id: number;
    nome?: string;
    email?: string;
    senha?: string;
    tipo?: Tipo;
    instituicao_id?: number;
    identificacao?: string;
    curso?: string;
};