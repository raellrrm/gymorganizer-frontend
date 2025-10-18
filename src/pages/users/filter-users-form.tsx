import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from "react-imask";
import { cpf } from "cpf-cnpj-validator";
import { useSearchParams } from "react-router";

const usersFilterSchema = z.object({
    cpf: z
        .string()
        .transform((val) => (val.trim() === "" ? undefined : val))
        .optional()
        .refine((value) => !value || cpf.isValid(value), { message: "CPF inválido." }),
    status: z.string().optional()
});

type UsersFilterForm = z.infer<typeof usersFilterSchema>;


export const FilterUsersForm = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const cpf = searchParams.get('cpf');
    const status = searchParams.get('status');

    const { handleSubmit, reset, control, formState: { errors } } = useForm<UsersFilterForm>({
        resolver: zodResolver(usersFilterSchema),
        defaultValues: {
            cpf: cpf ?? '',
            status: status ?? 'todos'
        }
    });

    const handleClearFilters = () => {
        setSearchParams((state) => {
            state.delete('cpf')
            state.delete('status')

            return state;
        });

        reset({
            cpf: '',
            status: 'todos'
        })
    }

    const handleFilterUsers = (data: UsersFilterForm) => {
        data.cpf = data.cpf?.replace(/[^0-9]/g, "");
        setSearchParams(state => {
            if (data.cpf) {
                state.set('cpf', data.cpf)
            } else {
                state.delete('cpf')
            }
            if (data.status) {
                state.set('status', data.status)
            } else {
                state.delete('status')
            }

            return state;
        })
    }

    return (
        <form onSubmit={handleSubmit(handleFilterUsers)} className="space-y-4 flex flex-col gap-2" action="">
            <div className="space-y-1">
                <Controller
                    name="cpf"
                    control={control}
                    render={({ field }) => (
                        <IMaskInput
                            {...field}
                            mask="000.000.000-00"
                            placeholder="Buscar por cpf"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
                  ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none 
                  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        />
                    )}
                />
                {errors.cpf && (
                    <p className="text-sm text-red-500">{errors.cpf.message}</p>
                )}
            </div>

            <Controller
                name="status"
                control={control}
                render={({ field: { name, onChange, value, disabled } }) => {
                    return (
                        <Select defaultValue="all" name={name} onValueChange={onChange} value={value} disabled={disabled}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={"Status"} />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="todos">Todos</SelectItem>
                                <SelectItem value="ativo">Ativo</SelectItem>
                                <SelectItem value="pendente">Pendente</SelectItem>
                                <SelectItem value="inativo">Inativo</SelectItem>
                            </SelectContent>

                        </Select>
                    )
                }}
            />
            <div className="grid grid-cols-2 gap-2 md:block md:space-y-2">
                <Button type="submit" className="md:w-full cursor-pointer bg-foreground col-span-1">Filtrar</Button>
                <Button onClick={handleClearFilters} variant={"outline"} className="md:w-full cursor-pointer  col-span-1">Limpar filtros</Button>
            </div>
        </form>
    );
}