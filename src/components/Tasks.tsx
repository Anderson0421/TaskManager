import { ListTasks } from "@/api/FetchAPI"
import { TaskType } from "@/types/type"
import { useQuery } from "@tanstack/react-query"
import NewTask from "./NewTask"

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

    const UpdateStateTask = (id:number) =>{
        // Pendiente actualizar la tareaa 
        console.log(id)
    }
    const deletedTasks = data.filter((task: TaskType) => task.isDelete);


    return (
        <>
            <NewTask />
            <section className="grid grid-cols-3 w-max gap-8 mt-3 pl-6">
                <div className="flex flex-col gap-4 w-max">
                    <p className="flex items-center gap-2">
                        <div className="rounded-full bg-red-600 w-4 p-2"></div>
                        Pending Tasks {
                            data.filter((task: TaskType) => !task.isCompleted).length
                        }
                    </p>
                    {
                        data.map((task: TaskType) => {
                            return !task.isCompleted && (
                                <div key={task.id} className="bg-gray-800/80 p-6 rounded-xl w-96">
                                    <p className="text-white font-semibold text-lg">
                                        {task.name}
                                    </p>
                                    <p className="text-gray-200 text-sm">
                                        {task.description}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex flex-col gap-4 w-max">
                    <p className="flex items-center gap-2">
                        <div className="rounded-full bg-green-400 w-4 p-2"></div>
                        Completed Tasks {
                            data.filter((task: TaskType) => task.isCompleted).length
                        }
                    </p>
                    {
                        data.map((task: TaskType) => {
                            return task.isCompleted && (
                                <div key={task.id} className="bg-gray-800/80 p-6 rounded-xl w-96">
                                    <p className="text-white font-semibold text-lg">
                                        {task.name}
                                    </p>
                                    <p className="text-gray-200 text-sm">
                                        {task.description}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="flex flex-col gap-4 w-max">
                    <p className="flex items-center gap-2">
                        <div className="rounded-full bg-gray-400 w-4 p-2"></div>
                        Papelera de tareas {
                            data.filter((task: TaskType) => task.isDelete).length
                        }
                    </p>
                    {deletedTasks.length > 0 ? (
                        deletedTasks.map((task: TaskType) => (
                            <div key={task.id} className="relative bg-gray-600 opacity-50 p-6 rounded-xl w-96">
                                <p className="text-white font-semibold text-lg">
                                    {task.name}
                                </p>
                                <button
                                    className="absolute mr-2 mt-2 top-0 right-0  px-2 py-1 rounded-md text-white text-sm"
                                    onClick={()=>UpdateStateTask(task.id)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" />
                                    </svg>

                                </button>
                                <p className="text-gray-200 text-sm">
                                    {task.description}
                                </p>
                            </div>
                        ))
                    ) : (
                        <h1 className="mt-5 text-gray-400 font-semibold">
                            No tienes tareas eliminadas :D
                        </h1>
                    )}

                </div>
            </section>
        </>
    )
}