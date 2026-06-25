export type TCreateProject = {
  title: string;

  description: string;

  start_date: string;

  end_date: string;
};

export type TUpdateProject = {
  title: string;

  description?: string;

  status: EProjectStatus;

  start_date: Date;

  end_date: Date;
};

export enum EProjectStatus {
  ACTIVE = "active",
  ARCHIVED = "archived",
  COMPLETED = "completed",
}

export type TProject = {
  id: number;

  title: string;

  description: string;

  status: EProjectStatus;

  owner_id: number;

  start_date: Date;

  end_date: Date;

  created_at: Date;

  updated_at: Date;

  // Relations

  //   owner: User;

  //   members: ProjectMember[];

  //   tasks: Tasks[];
};
