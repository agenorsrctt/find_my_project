import { db } from "./connection.js";

export async function gerarTabelas() {
    try {
        await db.execute(
            `CREATE TABLE IF NOT EXISTS instituicoes(
            id int auto_increment primary key,
            nome varchar(255) not null
        )`
        );

        await db.execute(
            `CREATE TABLE IF NOT EXISTS usuarios(
            id int auto_increment primary key,
            nome varchar(255) not null,
            email varchar(255) not null unique,
            senha varchar(255) not null,
            tipo enum("superAdmin", "responsavel", "aluno", "visitante") NOT NULL default "visitante",
            instituicao_id int null,
            identificacao varchar(255) null,
            curso varchar(255) null,
            CONSTRAINT fk_instituicao_user foreign key (instituicao_id) references instituicoes(id)
        )`
        );


        await db.execute(
            `CREATE TABLE IF NOT EXISTS projetos(
            id int auto_increment primary key,
            responsavel_id int not null,
            instituicao_id int not null,
            nome varchar(255) not null,
            integrantes varchar(255) not null,
            data TIMESTAMP default CURRENT_TIMESTAMP,
            descricao text null,
            tecnologias varchar(255) null,
            gitHub_url varchar(255) null,
            img_capa_url varchar(255) null,
            CONSTRAINT fk_responsavel_proj foreign key (responsavel_id) references usuarios(id),
            CONSTRAINT fk_instituicao_proj foreign key (instituicao_id) references instituicoes(id)
        )`
        );

        await db.execute(
            `CREATE TABLE IF NOT EXISTS upvotes(
            id int auto_increment primary key,
            usuario_id int not null,
            projeto_id int not null,
            CONSTRAINT fk_usuario_up foreign key (usuario_id) references usuarios(id),
            CONSTRAINT fk_projeto_up foreign key (projeto_id) references projetos(id),
            UNIQUE(usuario_id, projeto_id)
        )`
        );

        console.log("Tabelas criadas com sucesso!")
    } catch (error) {
        console.log("Erro ao criar tabelas: " + error)
    }
};