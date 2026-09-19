export interface ProjetosDTO {
    readonly id: number;
    readonly responsavel_id: number;
    readonly instituicao_id: number;
    nome: string;
    descricao?: string;
    tecnologias?: string;
    integrantes: string;
    gitHub_url?: string
    img_capa_url?: string;
}

export interface AltearProjetosDTO {
    readonly id: number;
    responsavel_id?: number;
    instituicao_id?: number;
    nome?: string;
    descricao?: string;
    tecnologias?: string;
    integrantes: string;
    gitHub_url?: string
    img_capa_url?: string;
}