import { create } from "zustand";
import { devtools } from "zustand/middleware";

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

interface BoardState {
  boards: Board[];
  currentBoard: Board | null;
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
  tasks: Task[];
  createTaskList: (data: CreateTaskListPayload) => Promise<void>;
  deleteTaskList: (taskListId: string) => Promise<void>;
}

export const useBoardStore = create<BoardState>()(
  devtools((set) => ({
    boards: [],
    tasks: [],
    currentBoard: null,
    loadingBoards: false,
    creatingBoard: false,
    deletingBoard: false,
    backgroundType: "COLOR",
    bgImageUrl: "",
    currentBg: "red",
    uploadedImages: [],

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
              tasks: [...(state.tasks ?? [])],
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
              boardLists: [...(state.currentBoard.boardLists ?? []), newList],
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
  })),
);
