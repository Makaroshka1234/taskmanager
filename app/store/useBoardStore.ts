import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { API_ROUTES } from "../utils/constans/apiRoutes";

type Priority = "LOW" | "HIGH" | "MEDIUM";

interface BoardList {
  id: string;
  title: string;
  tasks: Task[];
  boardId: string;
}

interface Task {
  id: string;
  title: string;
  priority: Priority;
  completed: boolean;
  boardListId: string;
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

interface CreateBoardPayload {
  title: string;
}

interface CreateTaskListPayload {
  title: string;
  boardId: string;
}

interface addTaskPayload {
  boardListId: string;
  title: string;
  priority: Priority;
}
interface deleteTaskData {
  taskId: string;
  taskListId: string;
}

interface BoardState {
  boards: Board[];
  currentBoard: Board;
  loadingBoards: boolean;
  creatingBoard: boolean;
  deletingBoard: boolean;
  fetchBoard: (boardId: string) => Promise<void>;
  createBoard: (data: CreateBoardPayload) => Promise<void>;
  deleteBoard: (boardId: string) => Promise<void>;
  setBoards: (boards: Board[]) => void;
  backgroundType: string;
  currentBg: string;
  bgImageUrl: string;
  setImageUrl: (url: string) => Promise<void>;
  setBackgroundType: (type: "COLOR" | "IMAGE") => Promise<void>;
  uploadedImages: string[];
  createTaskList: (data: CreateTaskListPayload) => Promise<void>;
  deleteTaskList: (taskListId: string) => Promise<void>;
  setTasks: (tasks: Task[]) => void;
  addTask: (payload: addTaskPayload) => Promise<void>;
  deleteTask: (data: deleteTaskData) => void;
}

export const useBoardStore = create<BoardState>()(
  devtools((set) => ({
    boards: [],
    currentBoard: {
      id: "",
      title: "",
      tasks: [],
      boardLists: [],
      uploadedImages: [],
      backgroundImageUrl: "",
      backgroundType: "COLOR",
      boardColor: "red",
    },

    fetchBoard: async (boardId) => {
      try {
        set({ loadingBoards: true }, false, "boards/fetch_request");

        const res = await fetch(`/api/board/${boardId}`);
        if (!res.ok) throw new Error("Failed to fetch board");

        const data = await res.json();
        set({ currentBoard: data }, false, "boards/fetch_success");
      } catch (err) {
        console.error(err);
        set({ loadingBoards: false }, false, "boards/fetch_failed");
      } finally {
        set({ loadingBoards: false });
      }
    },

    createBoard: async (payload) => {
      try {
        set({ creatingBoard: true }, false, "boards/create_request");

        const res = await fetch("/api/board/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to create board");

        const data = await res.json();
        const newBoard: Board = data.board;

        if (newBoard) {
          set(
            (state) => ({
              boards: [...state.boards, newBoard],
              backgroundType: "COLOR",
              tasks: [...(newBoard.tasks ?? [])],
            }),
            false,
            "boards/create_success",
          );
        }
      } catch (err) {
        console.error(err);
        set({ creatingBoard: false }, false, "boards/create_failed");
      } finally {
        set({ creatingBoard: false });
      }
    },

    deleteBoard: async (boardId) => {
      try {
        set({ deletingBoard: true }, false, "boards/delete_request");

        const res = await fetch("/api/board/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ boardId }),
        });

        if (!res.ok) throw new Error("Failed to delete board");

        set(
          (state) => ({
            boards: state.boards.filter((b) => b.id !== boardId),
          }),
          false,
          "boards/delete_success",
        );
      } catch (err) {
        console.error(err);
        set({ deletingBoard: false }, false, "boards/delete_failed");
      } finally {
        set({ deletingBoard: false });
      }
    },

    setBoards: (boards) => {
      set({ boards }, false, "boards/set_all");
    },
    setImageUrl: (url: string) => {
      set(
        (state) => {
          if (!state.currentBoard) return state;
          const currentImages = state.currentBoard.uploadedImages ?? [];
          const alreadyHas = currentImages.includes(url);

          return {
            currentBoard: {
              ...state.currentBoard,
              backgroundImageUrl: url,
              uploadedImages: alreadyHas
                ? currentImages
                : [...currentImages, url],
            },
          };
        },
        false,
        "board/set_image_bg",
      );
    },
    setBackgroundType: (type: string) => {
      set(
        (state) => {
          if (!state.currentBoard) return state;

          return {
            currentBoard: {
              ...state.currentBoard,
              backgroundType: type,
            },
          };
        },
        false,
        "board/set_background_type",
      );
    },
    createTaskList: async (payload) => {
      const res = await fetch("/api/list/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Create list failed");
      }
      const data = await res.json();
      const newList = data.list;
      set(
        (state) => {
          if (!state.currentBoard) return state;
          return {
            currentBoard: {
              ...state.currentBoard,
              boardLists: [
                ...((state.currentBoard.boardLists ?? []) as BoardList[]),
                newList,
              ],
            },
          };
        },
        false,
        "newTaskList/create",
      );
    },
    deleteTaskList: async (taskListId) => {
      const res = await fetch("/api/list/del", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listId: taskListId }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete taskList");
      }

      set(
        (state) => {
          if (!state.currentBoard) return state;

          return {
            currentBoard: {
              ...state.currentBoard,
              boardLists: (state.currentBoard.boardLists ?? []).filter(
                (list) => list.id !== taskListId,
              ),
            },
          };
        },
        false,
        "taskList/delete_success",
      );
    },

    addTask: async (payload) => {
      const res = await fetch("/api/task/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`Cant create task`);
      }
      const newTask = await res.json();
      set(
        (state) => {
          if (!state.currentBoard || !state.currentBoard.boardLists)
            return state;

          return {
            currentBoard: {
              ...state.currentBoard,

              boardLists: state.currentBoard.boardLists.map((list) => {
                if (list.id !== payload.boardListId) {
                  return list;
                }

                return {
                  ...list,
                  tasks: [...(list.tasks ?? []), newTask],
                };
              }),
            },
          };
        },
        false,
        "task/add_succ",
      );
    },
    deleteTask: async ({ taskId, taskListId }) => {
      try {
        const res = await fetch("/api/task/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ taskId }),
        });
        if (!res.ok) throw new Error("delete task failed");

        set(
          (state) => ({
            currentBoard: {
              ...state.currentBoard,
              boardLists: (state.currentBoard.boardLists ?? []).map((list) =>
                list.id !== taskListId
                  ? list
                  : {
                      ...list,
                      tasks: list.tasks.filter((t) => t.id !== taskId),
                    },
              ),
            },
          }),
          false,
          "task/delete_success",
        );
      } catch (err) {
        throw new Error("delete task failed");
      }
    },
  })),
);

export const useBoardGetTasks = () =>
  useBoardStore((state) => state.currentBoard.tasks);
export const useBoardGetTaskLists = () =>
  useBoardStore((state) => state.currentBoard.boardLists);
// export const useBoardSetTasks = () => useBoardStore((state) => state.setTasks);
export const useBoardAddTask = () => useBoardStore((state) => state.addTask);
export const useBoardDeleteTask = () =>
  useBoardStore((state) => state.deleteTask);
