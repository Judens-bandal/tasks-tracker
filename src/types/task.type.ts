export type TCreateTask = {
  title: string;

  description: string;

  priority: ETaskPriority;

  assignee_id: number;

  due_date?: Date;
};

export type TTasks = {
  id: number;

  title: string;

  description: string;

  status: ETasksStatus;

  priority: ETaskPriority;

  project_id: number;

  assignee_id: number;

  created_by: number;

  due_date: Date;

  created_at: Date;

  updated_at: Date;

  //   project: Project;

  //   assignee: User;

  //   creator: User;
};

export enum ETasksStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  IN_REVIEW = "in_review",
  DONE = "done",
}

export enum ETaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}
