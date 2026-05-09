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

export type Board = {
  id: string;
  title: string;
  boardLists: BoardList[];
};

export function useBoard(boardId: string) {
  const [board, setBoard] = useState<Board | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!boardId) return;

    const fetchBoard = async () => {
      try {
        setLoading(true);

        const res = await apiFetch(`/api/board/${boardId}`);
        if (!res.ok) throw new Error("Failed to fetch board");

        const data = await res.json();
        setBoard(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBoard();
  }, [boardId]);

  return { board, loading, error };
}
