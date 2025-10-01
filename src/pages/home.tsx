import { Helmet } from "react-helmet-async"
import { CardActiveUsers } from "./card-active-users"
import { CardPendingUsers } from "./card-pending-users"
import { CardMonthAmount } from "./card-month-amount"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { UsersTable } from "./users/users-table"
import { FilterUsersForm } from "./users/filter-users-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export const Home = () => {

    return (
        <>
            <Helmet title="Home" />
            <div className="flex flex-1 flex-col gap-5 max-w-[1200px] my-0 mx-auto justify-center">
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                    <CardActiveUsers />
                    <CardPendingUsers />
                    <CardMonthAmount />
                </div>
                <div className="flex flex-col md:flex-row gap-4 shadow-md bg-slate-800/10 rounded-md p-2">
                    <div className="w-full md:w-3xs bg-white  p-4 rounded-md h-auto space-y-4">
                        <FilterUsersForm />
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-full cursor-pointer">Adicionar Aluno</Button>
                            </DialogTrigger>
                            <DialogContent className="">
                                <DialogHeader>
                                    <DialogTitle>Adicionar aluno</DialogTitle>
                                </DialogHeader>

                                <form>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div className="col-span-2 space-y-2 ">
                                            <Label htmlFor="nome">Nome</Label>
                                            <Input id="nome" type="text"></Input>
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <Label htmlFor="sobrenome">Sobrenome</Label>
                                            <Input id="sobrenome" type="text"></Input>
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <Label htmlFor="Data de nascimento">Nascimento</Label>
                                            <Input type="date" id="Data de nascimento"></Input>
                                        </div>
                                        <div className="col-span-2 space-y-2">
                                            <Label htmlFor="cpf">CPF</Label>
                                            <Input id="cpf" type="text"></Input>
                                        </div>
                                        <div className="space-y-2 col-span-4">
                                            <Label htmlFor="email">E-mail</Label>
                                            <Input type="email" id="email"></Input>
                                        </div>
                                        <div className="space-y-2 col-span-4">
                                            <Label>Escolher plano</Label>
                                            <RadioGroup className="flex justify-around">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="mensal" id="mensal" />
                                                    <Label className="text-sm md:text-md" htmlFor="mensal">Mensal</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="semestral" id="semestral" />
                                                    <Label className="text-sm md:text-md" htmlFor="semestral">Semestral</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="anuak" id="anual" />
                                                    <Label className="text-sm md:text-md" htmlFor="anual">Anual</Label>
                                                </div>
                                            </RadioGroup>
                                        </div>
                                    </div>
                                    <Button className="w-full mt-4 cursor-pointer">Cadastrar</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="flex-1 bg-white p-4 rounded-md">
                        <UsersTable />
                    </div>
                </div>
            </div>
        </>
    )
}