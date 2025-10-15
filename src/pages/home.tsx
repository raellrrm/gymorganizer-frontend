import { Helmet } from "react-helmet-async"
import { CardActiveUsers } from "./card-active-users"
import { CardPendingUsers } from "./card-pending-users"
import { CardMonthAmount } from "./card-month-amount"
import { Button } from "@/components/ui/button"
import { UsersTable } from "./users/users-table"
import { FilterUsersForm } from "./users/filter-users-form"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { AddUser } from "./users/add-user"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getDashboard } from "@/api/get-dashboard"

export const Home = () => {
    const [open, setOpen] = useState(false);
    const { data: dashboard } = useQuery({
        queryKey: ["dashboard"],
        queryFn: getDashboard
    })

    return (
        <>
            <Helmet title="Home" />
            <div className="flex flex-1 flex-col gap-5 max-w-[1200px] my-0 mx-auto justify-center">
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                    <CardActiveUsers totalUsuariosAtivos={dashboard?.totalAlunosAtivos}/>
                    <CardPendingUsers totalUsuariosPendentes={dashboard?.totalAlunosPendentes}/>
                    <CardMonthAmount totalValorMes={dashboard?.receitaDoMes}/>
                </div>
                <div className="flex flex-col md:flex-row gap-4 shadow-md bg-slate-800/10 rounded-md p-2">
                    <div className="w-full md:w-3xs bg-white  p-4 rounded-md h-auto space-y-4">
                        <FilterUsersForm />
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <Button className="w-full cursor-pointer">Adicionar Aluno</Button>
                            </DialogTrigger>
                            <AddUser onClose={() => setOpen(false)} />
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