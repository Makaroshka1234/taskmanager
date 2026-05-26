import { useEffect, useState } from "react";
import { apiFetch } from "../utils/apiFetch";

type Task = {
  id: string;
  title: string;
  priority: string;
};

type BoardList = {
  id: string;
  title: string;
  tasks: Task[];
};
type BoardType = "IMAGE" | "COLOR";
export type Board = {
  id: string;
  title: string;
  boardLists: BoardList[];
  uploadedImages: string[];
  backroundImageUrl: string;
  backgroundType: BoardType;
  boardColor: string;
};

export function useBoard(boardId: string) {
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Похідне значення: автоматично оновлюється, коли змінюється board
  const boardImages = board?.uploadedImages ?? [];

  useEffect(() => {
    if (!boardId) return;

    const fetchBoard = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await apiFetch(`/api/board/${boardId}`);
        if (!res.ok) throw new Error("Failed to fetch board");

        const data = await res.json();
        setBoard(data);
      } catch (error: unknown) {
        setError(error instanceof Error ? error.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [boardId]);

  // 1. Функція для додавання нової картинки в масив
  const addImage = (newImageUrl: string) => {
    setBoard((prevBoard) => {
      if (!prevBoard) return null;
      return {
        ...prevBoard,
        uploadedImages: [...prevBoard.uploadedImages, newImageUrl],
      };
    });
  };

  // 2. Функція для видалення картинки з масиву
  const removeImage = (imageUrlToRemove: string) => {
    setBoard((prevBoard) => {
      if (!prevBoard) return null;
      return {
        ...prevBoard,
        uploadedImages: prevBoard.uploadedImages.filter(
          (url) => url !== imageUrlToRemove,
        ),
      };
    });
  };

  // 3. Універсальний метод для оновлення будь-яких даних борди ззовні (опціонально)
  const mutateBoard = (
    updatedBoard: Board | ((prev: Board | null) => Board | null),
  ) => {
    setBoard(updatedBoard);
  };

  return {
    board,
    loading,
    error,
    boardImages,
    addImage,
    removeImage,
    mutateBoard,
  };
}
