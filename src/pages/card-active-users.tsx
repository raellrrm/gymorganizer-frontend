import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User2Icon } from "lucide-react"

export const CardActiveUsers = () => {
    return (
        <Card>
            <CardHeader className="flex justify-between">
                <CardTitle className="font-semibold text-lg md:text-2xl">Usuários ativos</CardTitle>
                <User2Icon />
            </CardHeader>
            <CardContent className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                <span className="font-medium ml-4 text-2xl md:text-3xl">300</span>
            </CardContent>
        </Card>
    )
}