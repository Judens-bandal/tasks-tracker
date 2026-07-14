import { ProjectService } from "@/services/project.service";
import { TApiResponse, TMutationParams } from "@/types/api-response.type";
import { TCreateProject, TProject } from "@/types/project.type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAppMutation } from "./use-app-mutation";
import { useAuth } from "./use.auth";

const projectService = new ProjectService();

export const useFetchMyProject = ({
  id,
  queryKey,
  enabled = true,
}: {
  id: number;
  queryKey: string;
  enabled: boolean;
}) => {
  return useQuery<TApiResponse<TProject[]>>({
    queryKey: [queryKey],
    queryFn: async () => {
      return await projectService.getAll();
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!id && enabled,
  });
};

export const useCreateProject = (params: TMutationParams) => {
  const queryClient = useQueryClient();
  const { userId } = useAuth();
  return useAppMutation<TCreateProject>(
    (data) => projectService.createProject(data),
    {
      loading: "Creating... ",
      success: "Created success",
      toastId: "create-project",
    },
    {
      ...params,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [`my-projects-${userId}`] });
        params.onSuccess?.();
      },
    },
  );
};
