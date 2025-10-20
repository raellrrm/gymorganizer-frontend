import { deleteUser } from "@/api/delete-user";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { queryClient } from "@/lib/react-query";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

type DeleteUserProps = {
    userId: number;
    onClose: () => void; // Função para fechar o modal
};

export const DeleteUser = ({ userId, onClose }: DeleteUserProps) => {
    const { mutateAsync: deleteUserFn } = useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            // Atualiza a lista de usuários em cache após a exclusão
            queryClient.invalidateQueries({ queryKey: ["users"] });
            queryClient.invalidateQueries({queryKey: ["dashboard"]})
        },
    });

    const handleDeleteUser = async () => {
        try {
            await deleteUserFn({ userId });
            toast.success("Usuário removido com sucesso!");
            onClose(); // Fecha o modal após sucesso
        } catch (error: any) {
            const message = error.response?.data?.detail || "Erro ao remover usuário.";
            toast.error(message);
        }
    };

    return (
        <DialogContent className="w-full md:max-w-[300px]">
            <DialogHeader>
                <DialogTitle>Tem certeza de que deseja remover este usuário?</DialogTitle>
            </DialogHeader>

            <div className="flex justify-between">
                <Button onClick={handleDeleteUser} variant="destructive">
                    Sim, tenho certeza
                </Button>
                <Button onClick={onClose} variant="outline">
                    Não
                </Button>
            </div>
        </DialogContent>
    );
};
