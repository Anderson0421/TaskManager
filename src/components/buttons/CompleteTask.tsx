import { ChangeStateTask } from "@/api/FetchAPI";
import { TaskType } from "@/types/type";
import { useQueryClient, useMutation } from "@tanstack/react-query";



export default function CompleteTask({ task }: { task: TaskType }) {
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
                    isCompleted: !task.isCompleted
                })}
                className="absolute mr-8 mt-1.5 top-0 right-0  px-2 py-1 rounded-md text-white text-sm">
                {
                    task.isCompleted ?
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 pb-0.5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                }

            </button>
        </>
    )
}