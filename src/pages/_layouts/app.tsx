import { Header } from "@/components/header"
import { Outlet } from "react-router"

export const AppLayout = () => {
    return (
        <div className="flex min-h-screen flex-col">
            <Header/>

            <div className="p-4 pt-8">
                <Outlet/>
            </div>
        </div>
    )
}