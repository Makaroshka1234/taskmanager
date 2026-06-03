export type Priority = "LOW" | "HIGH" | "MEDIUM";

export interface Task {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  boardListId: string;
  comments: IComment[];
}

export interface BoardList {
  id: string;
  title: string;
  tasks: Task[];
  boardId: string;
}

export interface Board {
  id: string;
  title: string;
  boardLists?: BoardList[];
  backgroundType?: string;
  uploadedImages?: string[] | null;
  backgroundImageUrl?: string | null;
  boardColor?: string | null;
  tasks: Task[];
}

export interface IComment {
  id: string;
  creatorId: string;
  taskId: string;
  text: string;
  creatorEmail: string;
  createdAt: string;
}
