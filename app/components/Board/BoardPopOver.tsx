import { useBoard } from "@/app/hooks/useBoard";
import { useBoardStore } from "@/app/store/useBoardStore";
import { Button } from "@/schadComponents/ui/button";
import { Card, CardContent } from "@/schadComponents/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/schadComponents/ui/popover";
import { Separator } from "@/schadComponents/ui/separator";
import { ChevronLeft, Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  children: React.ReactNode;

  boardId: string;
};

type ViewType = "MENU" | "CHANGEBG" | "PHOTOS" | "COLORS";

function BoardPopOver({ children, boardId }: Props) {
  const backgroundImageUrl = useBoardStore(
    (state) => state.currentBoard?.backgroundImageUrl,
  );
  const boardBgImages = useBoardStore(
    (state) => state.currentBoard?.uploadedImages,
  );
  const setImageUrl = useBoardStore((state) => state.setImageUrl);
  const setBgType = useBoardStore((state) => state.setBackgroundType);
  const [currentView, setCurrentView] = useState<ViewType>("MENU");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/board/bgUpload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to upload image to storage");

      const data = await res.json();
      const url = data.url;

      setImageUrl(url);

      await fetch("/api/board/add-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boardId,
          url,
        }),
      });
    } catch (error) {
      console.error("Error updating board background:", error);
    }
  };

  const handleChangeBgPhoto = async (url: string) => {
    try {
      setBgType("IMAGE");
      setImageUrl(url);
      const res = await fetch("/api/board/updBg", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          boardId,
          backgroundImageUrl: url,
          backgroundType: "IMAGE",
        }),
      });

      if (!res.ok) throw new Error("Failed to update background on server");
    } catch (error) {
      console.error("Помилка оновлення фону:", error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-100">
        {currentView === "MENU" && (
          <>
            <PopoverHeader>Меню</PopoverHeader>
            <Button onClick={() => setCurrentView("CHANGEBG")}>
              Change bg
            </Button>
          </>
        )}
        {currentView === "CHANGEBG" && (
          <>
            <PopoverHeader className="flex items-center justify-between flex-row">
              <Button
                type="button"
                size="icon"
                onClick={() => setCurrentView("MENU")}
              >
                <ChevronLeft />
              </Button>
              <PopoverTitle>Change Background</PopoverTitle>
            </PopoverHeader>
            <div className="flex flex-col gap-3">
              <ul className="def-bg-variants grid grid-cols-2 gap-5 w-full">
                <li className="bg-variant text-center">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-30 w-full p-0 overflow-hidden border-none hover:opacity-90"
                  >
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url('https://trello.com/assets/8f9c1323c9c16601a9a4.jpg')`,
                      }}
                    />
                  </Button>
                  <p className="bg-variant-title">Фотографії</p>
                </li>
                <li className="bg-variant text-center">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-30 w-full p-0 overflow-hidden border-none hover:opacity-90"
                  >
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url('https://trello.com/assets/8f9c1323c9c16601a9a4.jpg')`,
                      }}
                    />
                  </Button>
                  <p className="bg-variant-title">Кольори</p>
                </li>
              </ul>
              <Separator />
              <ul className="grid grid-cols-2 gap-2 w-full">
                {/* КАРТКА №1: Кнопка "Додати свій" */}
                <li className="h-30 w-full">
                  <Card className="relative h-full w-full p-0 overflow-hidden border-2 border-dashed bg-gray-50 hover:bg-gray-100 transition cursor-pointer rounded-md">
                    <CardContent className="h-full w-full flex items-center justify-center p-0">
                      <Plus className="h-6 w-6 text-gray-400" />
                      <form className="absolute inset-0 w-full h-full z-10">
                        <input
                          type="file"
                          name="background"
                          accept="image/*"
                          className="w-full h-full opacity-0 cursor-pointer"
                          onChange={handleFileChange}
                        />
                      </form>
                    </CardContent>
                  </Card>
                </li>
                \
                {boardBgImages?.map((url: string, index) => (
                  <li
                    key={index}
                    className="h-30 w-full rounded-md overflow-hidden border bg-gray-100 hover:opacity-90 transition cursor-pointer"
                  >
                    <div
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url('${url}')` }}
                      onClick={() => handleChangeBgPhoto(url)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default BoardPopOver;
