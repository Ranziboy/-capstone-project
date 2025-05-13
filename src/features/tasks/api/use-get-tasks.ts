import { client } from "@/lib/rpc"
import { useQuery } from "@tanstack/react-query"
import { TaskStatus } from "../types"

interface UseGetTasksProps{
    workspaceId: string
    projectId?: string | null
    status?: TaskStatus | null
    assigneeId?: string | null
    dueDate?: string | null
    search?:string | null
}

export const useGetTasks = ({workspaceId, search, assigneeId, dueDate, projectId, status}: UseGetTasksProps) => {
  const query = useQuery({
    queryKey: [
      "tasks",
      workspaceId,
      projectId,
      status,
      search,
      assigneeId,
      dueDate
    ],
    queryFn: async () => {
      const response = await client.api.tasks.$get({
        query:{
          workspaceId,
          projectId: projectId ?? undefined,
          status: status ?? undefined,
          search: search ?? undefined,
          dueDate: dueDate ?? undefined,
          assigneeId: assigneeId ?? undefined
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tasks")
      }

      const { data} = await response.json();

      return data;
    },
  });

  return query;
};
