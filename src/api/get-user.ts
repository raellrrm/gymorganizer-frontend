import { api } from "@/lib/axios"
import type { getUserResponse } from "./get-users";

type getUserProps = {
    userId: number;
}


export const getUser = async ({userId}: getUserProps) => {
    const response = await api.get<getUserResponse>(`/usuarios/${userId}`);
    return response.data;
}