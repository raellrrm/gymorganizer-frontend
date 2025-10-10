import { api } from "@/lib/axios"

type updateUserProps = {
    userId: number,
    nome: string,
    sobrenome: string,
    email: string,
    telefone: string,
}


export const updateUser = async ({ userId, nome, sobrenome, email, telefone }: updateUserProps) => {
    await api.put(`/usuarios/${userId}`, {
        nome,
        sobrenome,
        email,
        telefone
    });
}