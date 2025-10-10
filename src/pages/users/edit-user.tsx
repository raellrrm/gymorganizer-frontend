import { getUser } from "@/api/get-user";
import { updateUser } from "@/api/update-user";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { queryClient } from "@/lib/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { IMaskInput } from "react-imask";

type EditUserProps = {
    userId: number;
};

const EditUserSchema = z.object({
    nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
    sobrenome: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres."),
    email: z.string().email("E-mail inválido."),
    telefone: z.string().min(8, "Telefone inválido."),
});

type EditUserForm = z.infer<typeof EditUserSchema>;

export const EditUser = ({ userId }: EditUserProps) => {
    // Busca os dados do usuário
    const { data: user } = useQuery({
        queryKey: ["user", userId],
        queryFn: () => getUser({ userId }),
        enabled: !!userId,
    });

    // Atualiza o usuário
    const { mutateAsync: updateUserFn } = useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user", userId] });
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<EditUserForm>({
        resolver: zodResolver(EditUserSchema),
        defaultValues: {
            nome: "",
            sobrenome: "",
            email: "",
            telefone: "",
        },
    });

    // Preenche os campos quando os dados são carregados
    useEffect(() => {
        if (user) {
            reset({
                nome: user.nome,
                sobrenome: user.sobrenome,
                email: user.email,
                telefone: user.telefone,
            });
        }
    }, [user, reset]);

    const handleEditUser = async (data: EditUserForm) => {
        try {
            await updateUserFn({
                userId,
                ...data,
            });
            toast.success("Usuário atualizado com sucesso!");
        } catch (error: any) {
            const message = error.response?.data?.detail;
            const status = error.response?.status;

            if (status === 400 && message) toast.error(message);
            else if (status === 404) toast.error("Usuário não encontrado.");
            else toast.error("Erro ao atualizar usuário.");
        }
    };

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Editar usuário</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(handleEditUser)} className="space-y-4">
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-2 space-y-2">
                        <Label htmlFor="nome">Nome</Label>
                        <Input id="nome" type="text" {...register("nome")} />
                        {errors.nome && <p className="text-sm text-red-500">{errors.nome.message}</p>}
                    </div>

                    <div className="col-span-2 space-y-2">
                        <Label htmlFor="sobrenome">Sobrenome</Label>
                        <Input id="sobrenome" type="text" {...register("sobrenome")} />
                        {errors.sobrenome && <p className="text-sm text-red-500">{errors.sobrenome.message}</p>}
                    </div>

                    <div className="col-span-2 space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input id="email" type="email" {...register("email")} />
                        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                    </div>

                    <div className="col-span-2 space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Controller
                            name="telefone"
                            control={control}
                            render={({ field }) => (
                                <IMaskInput
                                    {...field}
                                    mask="(00) 00000-0000"
                                    placeholder="(00) 00000-0000"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 
                             text-sm ring-offset-background placeholder:text-muted-foreground 
                             focus-visible:outline-none focus-visible:ring-2 
                             focus-visible:ring-ring focus-visible:ring-offset-2"
                                />
                            )}
                        />
                        {errors.telefone && <p className="text-sm text-red-500">{errors.telefone.message}</p>}
                    </div>
                </div>

                <div className="flex gap-3 mt-6">
                    <Button type="submit" className="w-full">
                        Editar
                    </Button>
                </div>
            </form>
        </DialogContent>
    );
};
