import { client } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";

interface UseGetTaskProps {
  taskId: string;
}

export const useGetTask = ({ taskId }: UseGetTaskProps) => {
  const query = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await client.api.tasks[":taskId"].$get({ param: { taskId } });

      if (!response.ok) {
        throw new Error("Failed to fetch task");
      }

      const responseJson = await response.json();
      if ("data" in responseJson) {
        return responseJson.data;
      }

      throw new Error(responseJson.error || "Unknown error");
    },
  });

  return query;
};

// import { client } from "@/lib/rpc"
// import { useQuery } from "@tanstack/react-query"
// import { TaskStatus } from "../types"

// interface UseGetTaskProps{
//     taskId:string
// }

// export const useGetTask = ({ taskId}: UseGetTaskProps) => {
//   const query = useQuery({
//     queryKey: [
//       "task",
//       taskId
//     ],
//     queryFn: async () => {
//       const response = await client.api.tasks[":taskId"].$get({param :{ taskId}});

//       if (!response.ok) {
//         throw new Error("Failed to fetch task")
//       }

//       const { data } = await response.json();

//       return data;
//     },
//   });

//   return query;
// };
