import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { changePlan } from "@/api/change-plan";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";

type ChangePlanProps = {
    userId: number;
    plan:
    | {
        id: number;
        nome: string;
        valor: number;
        duracaoEmDias: number;
    }
    | undefined;
    onClose: () => void;
};

// Validação do formulário
const editPlanSchema = z.object({
    plano: z.string(),
});

type EditPlanForm = z.infer<typeof editPlanSchema>;

export const ChangePlan = ({ userId, plan, onClose }: ChangePlanProps) => {
    const { control, handleSubmit } = useForm<EditPlanForm>({
        resolver: zodResolver(editPlanSchema),
    });

    // Mutação para alterar o plano do usuário
    const { mutateAsync: changePlanFn } = useMutation({
        mutationFn: changePlan,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user", userId] });
            onClose();
        },
    });

    // Manipula o envio do formulário
    const handleChangePlan = async (data: EditPlanForm) => {
        try {
            await changePlanFn({
                userId,
                ...data,
            });
            toast.success("Plano atualizado com sucesso!");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                <DialogTitle>Alterar plano</DialogTitle>
            </DialogHeader>

            <Table>
                <TableRow>
                    <TableCell className="text-muted-foreground">Plano atual</TableCell>
                    <TableCell className="flex justify-end">
                        <b>
                            {plan?.nome} -{" "}
                            {plan?.valor.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </b>
                    </TableCell>
                </TableRow>
            </Table>

            <form onSubmit={handleSubmit(handleChangePlan)} className="mt-4 space-y-4">
                <div className="space-y-2">
                    <Label>Escolher plano</Label>

                    <Controller
                        name="plano"
                        control={control}
                        render={({ field }) => (
                            <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="flex justify-around"
                                defaultValue="1"
                            >
                                {/* Exibe apenas os planos diferentes do atual */}
                                {plan?.id !== 1 && (
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="1" id="mensal" />
                                        <Label htmlFor="mensal">Mensal</Label>
                                    </div>
                                )}

                                {plan?.id !== 2 && (
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="2" id="semestral" />
                                        <Label htmlFor="semestral">Semestral</Label>
                                    </div>
                                )}

                                {plan?.id !== 3 && (
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="3" id="anual" />
                                        <Label htmlFor="anual">Anual</Label>
                                    </div>
                                )}
                            </RadioGroup>
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <Button type="submit" className="col-span-1">
                        Alterar
                    </Button>
                    <Button onClick={onClose} variant="outline" className="col-span-1">
                        Cancelar
                    </Button>
                </div>
            </form>
        </DialogContent>
    );
};
