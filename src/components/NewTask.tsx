import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Close } from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateTask } from "@/api/FetchAPI"
import { TaskType } from "@/types/type"
import { useState } from "react"

export default function NewTask() {

    const [open, setOpen] = useState(false)

    const queryClient = useQueryClient()

    const addTaskMutation = useMutation({
        mutationFn: CreateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            })
        }
    })


    const handleSubmitTask = (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        const task: Partial<TaskType> = Object.fromEntries(formData);

        if (typeof task.id === "string") {
            task.id = parseInt(task.id);
        }

        task.isCompleted = false
        addTaskMutation.mutate(task as TaskType)
    }

    return (
        <div className="p-5">
            <Dialog open={open}>
                <DialogTrigger onClick={() => setOpen(!open)} className="w-52 px-5 py-2 rounded-lg bg-gray-900">
                    Crear nueva tarea +
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Crear nueva tarea
                        </DialogTitle>
                        <DialogDescription>
                            <div>
                                <form className="grid grid-row-3 gap-4"
                                    onSubmit={(e) => handleSubmitTask(e)}>
                                    <Input type="number" name="id" id="id" className="mt-3" placeholder="ID de la tarea" />
                                    <Input type="text" name="name" id="name" className="mt-1" placeholder="Nombre de la tarea" />
                                    <Input type="text" name="description" id="description" className="mt-1" placeholder="Descripcion de la tarea" />

                                    <Button className="mt-3">
                                        Crear
                                    </Button>
                                </form>
                            </div>
                        </DialogDescription>
                        <Close onClick={()=>setOpen(!open)} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400">
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close</span>
                        </Close>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}