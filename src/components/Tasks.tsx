import { ListTasks } from "@/api/FetchAPI"
import { TaskType } from "@/types/type"
import { useQuery } from "@tanstack/react-query"
import NewTask from "./NewTask"
import EditTask from "./EditTask"
import CompleteTask from "./buttons/CompleteTask"
import DeleteTask from "./buttons/DeleteTask"

export default function TasksList() {

    // Siempre el useQuery definirlo dentro de la aplicacion
    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['tasks'],
        queryFn: ListTasks
    })

    if (isLoading) {
        return <><div>Loading..</div></>
    }

    if (isError) {
        return <div>Error en {error.message}</div>
    }

    const TareasCompletadas = data.filter((task: TaskType) => task.isCompleted && !task.isDelete)
    const TareasIncompletas = data.filter((task: TaskType) => !task.isCompleted && !task.isDelete)

    return (
        <>
            <NewTask />
            <section className="grid grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 w-full gap-5 mt-3 max-sm:pl-0 pl-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-red-600 w-4 p-2"></div>
                        Pending Tasks {
                            TareasIncompletas.length
                        }
                    </div>
                    {
                        TareasIncompletas.length > 0 ?
                            TareasIncompletas.map((task: TaskType) => {
                                return (
                                    <div key={task.id} className="relative bg-gray-800/80 p-6 rounded-xl ">
                                        <p className="text-white font-semibold pt-3 text-lg">
                                            {task.name}
                                        </p>
                                        <CompleteTask
                                            task={task}
                                        />
                                        <DeleteTask
                                            task={task}
                                        />
                                        <p className="text-gray-200 text-sm">
                                            {task.description}
                                        </p>
                                    </div>
                                )
                            })
                            :
                            <h1>
                                No hay registros de tareas pendientes..
                            </h1>
                    }
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <div className="rounded-full bg-green-400 w-4 p-2"></div>
                        Completed Tasks {
                            TareasCompletadas.length
                        }
                    </div>
                    {
                        TareasCompletadas.length > 0 ?
                            TareasCompletadas.map((task: TaskType) => {
                                return (
                                    <div key={task.id} className="relative bg-gray-800/80 p-6 rounded-xl ">
                                        <p className="text-white font-semibold text-lg">
                                            {task.name}
                                        </p>
                                        <CompleteTask
                                            task={task}
                                        />
                                        <DeleteTask
                                            task={task}
                                        />

                                        <p className="text-gray-200 text-sm">
                                            {task.description}
                                        </p>
                                    </div>
                                )
                            }) :
                            <div>
                                <h1>
                                    No tienes tareas completadas...
                                </h1>
                            </div>
                    }
                </div>
                <EditTask
                    data={data}
                />
            </section>
        </>
    )
}