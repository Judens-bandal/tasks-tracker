import { TCreateProject, TProject, TUpdateProject } from "@/types/project.type";
import { BaseService } from "./base.service";
import { TApiResponse } from "@/types/api-response.type";

export class ProjectService extends BaseService<TProject> {
  constructor() {
    super("/projects");
  }

  async createProject(data: TCreateProject) {
    return await this.post("/create", data);
  }

  async updateProject(data: TUpdateProject) {
    return await this.put("/update", data);
  }

  async getAllProject(id: number) {
    return await this.getAll({ id });
  }
}
