import { ProjectService } from "@/services/project.service";
import { TApiResponse, TMutationParams } from "@/types/api-response.type";
import { TCreateProject, TProject } from "@/types/project.type";
import { useQuery } from "@tanstack/react-query";
import { useAppMutation } from "./use-app-mutation";

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
    queryKey: [queryKey, id],
    queryFn: async () => {
      return await projectService.getAll({ id });
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!id && enabled,
  });
};

export const useCreateProject = (params: TMutationParams) => {
  return useAppMutation<TCreateProject>(
    (data) => projectService.createProject(data),
    {
      loading: "Creating... ",
      success: "Created success",
      toastId: "create-project",
    },
    params,
  );
};
