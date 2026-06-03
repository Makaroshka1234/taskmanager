import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { API_ROUTES } from "../utils/constans/apiRoutes";
import { id } from "zod/v4/locales";
import { Task, Board, Priority, BoardList } from "../types/board";

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
interface setCurrentTaskData {
  taskId: string;
  taskListId: string;
}
interface updateTaskData {
  taskListId: string;
  uptadedTask: Partial<Task>;
}

interface BoardState {
  boards: Board[];
  currentBoard: Board;
  currentTask: Task;
  loadingBoards: boolean;
  creatingBoard: boolean;
  deletingBoard: boolean;
  backgroundType: string;
  currentBg: string;
  bgImageUrl: string;
  uploadedImages: string[];
  fetchBoard: (boardId: string) => Promise<void>;
  createBoard: (data: CreateBoardPayload) => Promise<void>;
  deleteBoard: (boardId: string) => Promise<void>;
  setBoards: (boards: Board[]) => void;
  setImageUrl: (url: string) => Promise<void>;
  setBackgroundType: (type: "COLOR" | "IMAGE") => Promise<void>;

  createTaskList: (data: CreateTaskListPayload) => Promise<void>;
  deleteTaskList: (taskListId: string) => Promise<void>;
  setTasks: (tasks: Task[]) => void;
  addTask: (payload: addTaskPayload) => Promise<void>;
  deleteTask: (data: deleteTaskData) => void;
  setCurrentTask: (data: setCurrentTaskData) => void;
  uptadeTask: (taskListId: string, uptadedTask: Partial<Task>) => void;
  createComment: (
    text: string,
    creatorId: string,
    taskId: string,
    creatorEmail: string,
  ) => Promise<void>;
  fetchComments: (taskId: string) => Promise<void>;
  loadingComments: boolean;
}

export const useBoardStore = create<BoardState>()(
  devtools((set) => ({
    boards: [],
    currentTask: {
      id: "",
      title: "",
      priority: "LOW",
      completed: false,
      boardListId: "",
      comments: [],
    },
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
    setCurrentTask: (data: setCurrentTaskData) => {
      const { taskId, taskListId } = data;

      set(
        (state) => {
          const taskList = state.currentBoard?.boardLists?.find(
            (list) => list.id === taskListId,
          );

          const task = taskList?.tasks?.find((t) => t.id === taskId);

          return {
            currentTask: task || state.currentTask,
          };
        },
        false,
        "currentTask/set",
      );
    },
    uptadeTask: (taskListId: string, uptadedTask: Partial<Task>) => {
      set(
        (state) => {
          return {
            currentBoard: {
              ...state.currentBoard,
              boardLists: state.currentBoard.boardLists?.map((list) =>
                list.id === taskListId
                  ? {
                      ...list,
                      tasks: list.tasks.map((t) =>
                        t.id === uptadedTask.id
                          ? {
                              ...t,
                              ...uptadedTask,
                            }
                          : t,
                      ),
                    }
                  : list,
              ),
            },
            currentTask:
              state.currentTask?.id === uptadedTask.id
                ? { ...state.currentTask, ...uptadedTask }
                : state.currentTask,
          };
        },
        false,
        "task/uptade",
      );
    },
    createComment: async (text, creatorId, taskId, creatorEmail) => {
      try {
        const res = await fetch("/api/comments/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, creatorId, taskId, creatorEmail }),
        });

        if (!res.ok) {
          throw new Error(`Cant create comment`);
        }

        const newComment = await res.json();

        set(
          (state) => {
            if (!state.currentBoard || !state.currentBoard.boardLists)
              return state;

            return {
              currentBoard: {
                ...state.currentBoard,
                boardLists: state.currentBoard.boardLists.map((list) => ({
                  ...list,
                  tasks: list.tasks.map((task) =>
                    task.id === taskId
                      ? {
                          ...task,
                          // Додаємо новий коментар у масив (якщо його не було, створюємо масив)
                          comments: [...(task.comments || []), newComment],
                        }
                      : task,
                  ),
                })),
              },

              currentTask:
                state.currentTask.id === taskId
                  ? {
                      ...state.currentTask,
                      comments: [
                        ...(state.currentTask.comments || []),
                        newComment,
                      ],
                    }
                  : state.currentTask,
            };
          },
          false,
          "comment/create_success",
        );
      } catch (err) {
        console.error(err);
      }
    },
    fetchComments: async (taskId: string) => {
      set({ loadingComments: true }, false, "comments/fetch_request");
      try {
        const res = await fetch(`/api/comments?taskId=${taskId}`);

        if (!res.ok) throw new Error("Failed to fetch comments");

        const comments = await res.json();

        set(
          (state) => ({
            currentTask: {
              ...state.currentTask,
              comments: comments,
            },
            loadingComments: false,
          }),
          false,
          "comments/fetch_success",
        );
      } catch (err) {
        console.error(err);
        set({ loadingComments: false }, false, "comments/fetch_failed");
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
export const useBoardSetCurrentTask = () =>
  useBoardStore((state) => state.setCurrentTask);
export const useBoardGetCurrentTask = () =>
  useBoardStore((state) => state.currentTask);
export const useBoardUpdateTask = () =>
  useBoardStore((state) => state.uptadeTask);

export const useCreateComment = () =>
  useBoardStore((state) => state.createComment);
export const useBoardTaskGetComments = () =>
  useBoardStore((state) => state.currentTask?.comments);
