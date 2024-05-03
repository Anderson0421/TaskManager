import { TaskType } from "@/types/type";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ChangeStateTask, DeleteTask } from "@/api/FetchAPI"

export default function EditTask({ data }: { data: TaskType[] }) {
    const queryClient = useQueryClient()

    const UpdateMutationTask = useMutation({
        mutationFn: ChangeStateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            })
        }
    })

    const DeleteTaskMutation = useMutation({
        mutationFn: DeleteTask,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            })
        }
    })

    const deletedTasks = data.filter((task: TaskType) => task.isDelete);

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2">
                <div className="rounded-full bg-gray-400 w-4 p-2"></div>
                Papelera de tareas {
                    deletedTasks.length
                }
            </div>
            {deletedTasks.length > 0 ? (
                deletedTasks.map((task: TaskType) => (
                    <div key={task.id} className="relative bg-gray-600 opacity-50 p-6 rounded-xl w-full">
                        <p className="text-white font-semibold text-lg">
                            {task.name}
                        </p>
                        <button
                            className="absolute mr-2 mt-2 top-0 right-0  px-2 py-1 rounded-md text-white text-sm"
                            onClick={() => {
                                DeleteTaskMutation.mutate(task.id)
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                            </svg>
                        </button>
                        <button
                            className="absolute mr-8 mt-2 top-0 right-0  px-2 py-1 rounded-md text-white text-sm"
                            onClick={() => {
                                UpdateMutationTask.mutate({
                                    ...task,
                                    isDelete: !task.isDelete
                                })
                            }}
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
    )
}