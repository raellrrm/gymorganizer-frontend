import { api } from "@/lib/axios"

type deleteUserProps = {
    userId: number;
}

export const deleteUser = async ({ userId }: deleteUserProps) => {
    return api.delete(`/usuarios/${userId}`);
}