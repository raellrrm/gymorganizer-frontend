import { api } from "@/lib/axios";
import type { getUserResponse } from "./get-users";

type addUserProps = {
    nome: string,
    sobrenome: string,
    dataNascimento: string,
    email: string,
    telefone: string,
    cpf: string,
    plano: string;
}


export const addUser = async({nome, sobrenome,dataNascimento,email,telefone,cpf,plano}: addUserProps): Promise<getUserResponse> => {
    const response = await api.post("/usuarios", {
        nome, 
        sobrenome,
        dataNascimento,
        telefone, 
        email,
        cpf,
        plano: {id: Number(plano)}
    });

    return response.data;
}