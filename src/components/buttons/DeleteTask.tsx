import { ChangeStateTask } from "@/api/FetchAPI";
import { TaskType } from "@/types/type";
import { useQueryClient, useMutation } from "@tanstack/react-query";



export default function DeleteTask({ task }: { task: TaskType }) {
    const queryClient = useQueryClient()

    const MutationChangeTaskCompleted = useMutation({
        mutationFn: ChangeStateTask,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['tasks']
            })
        }
    })
    return (
        <>
            <button
                onClick={() => MutationChangeTaskCompleted.mutate({
                    ...task,
                    isDelete: !task.isDelete
                })}
                className="absolute mr-2 mt-1 top-0 right-0  px-2 py-1 rounded-md text-white text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </button>
        </>
    )
}