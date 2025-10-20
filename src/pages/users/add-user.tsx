import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { cpf } from "cpf-cnpj-validator";
import { useMutation } from "@tanstack/react-query";
import { addUser } from "@/api/add-user";
import { toast } from "sonner";
import { queryClient } from "@/lib/react-query";

// Esquema de validação do formulário
const AddUserSchema = z.object({
  nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres."),
  sobrenome: z.string().min(2, "O sobrenome deve ter pelo menos 2 caracteres."),
  dataNascimento: z.string().min(1, "Data de nascimento inválida."),
  // cpf: z
  //   .string()
  //   .min(14, "CPF inválido.")
  //   .refine((value) => cpf.isValid(value), { message: "CPF inválido." }),
  cpf: z
    .string()
    .transform((val) => (val ?? "").replace(/\D/g, "")) 
    .refine((digits) => digits.length === 11, { message: "CPF inválido." }),
  email: z.string().email("Email inválido."),
  telefone: z.string().min(15, "Telefone inválido."),
  plano: z.string(),
});

type AddUserForm = z.infer<typeof AddUserSchema>;

type AddUserProps = {
  onClose: () => void;
};

export const AddUser = ({ onClose }: AddUserProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddUserForm>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      cpf: "",
      telefone: "",
      plano: "1",
    },
  });

  const { mutateAsync: addUserFn } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({queryKey: ["dashboard"]});
      reset();
      onClose();
    },
  });

  // Envia os dados do formulário para a API
  const handleAddUser = async (data: AddUserForm) => {
    data.cpf = data.cpf.replace(/[^0-9]/g, "");

    try {
      await addUserFn({ ...data });
      toast.success("Usuário cadastrado com sucesso!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error.response?.data?.detail;
      const status = error.response?.status;

      if (status === 400 && message) toast.error(message);
      else toast.error("Erro ao cadastrar usuário.");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar aluno</DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(handleAddUser)}>
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-2 space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input {...register("nome")} id="nome" />
            {errors.nome && (
              <p className="text-sm text-red-500">{errors.nome.message}</p>
            )}
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="sobrenome">Sobrenome</Label>
            <Input {...register("sobrenome")} id="sobrenome" />
            {errors.sobrenome && (
              <p className="text-sm text-red-500">{errors.sobrenome.message}</p>
            )}
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="dataNascimento">Nascimento</Label>
            <Input {...register("dataNascimento")} type="date" id="dataNascimento" />
            {errors.dataNascimento && (
              <p className="text-sm text-red-500">{errors.dataNascimento.message}</p>
            )}
          </div>

          <div className="col-span-2 space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <IMaskInput
                  {...field}
                  mask="000.000.000-00"
                  placeholder="000.000.000-00"
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

          <div className="col-span-2 space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input {...register("email")} id="email" type="email" />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
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
                  autoComplete="tel"
                  onBlur={(e) => {
                    const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
                    if (onlyNumbers.length === 11) {
                      field.onChange(onlyNumbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"));
                    }
                  }}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm 
  ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none 
  focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              )}
            />
            {errors.telefone && (
              <p className="text-sm text-red-500">{errors.telefone.message}</p>
            )}
          </div>

          <div className="col-span-4 space-y-2">
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
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="mensal" />
                    <Label htmlFor="mensal">Mensal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="semestral" />
                    <Label htmlFor="semestral">Semestral</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="anual" />
                    <Label htmlFor="anual">Anual</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.plano && (
              <p className="text-sm text-red-500">{errors.plano.message}</p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full mt-4 cursor-pointer">
          Cadastrar
        </Button>
      </form>
    </DialogContent>
  );
};  