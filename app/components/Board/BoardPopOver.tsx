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
import {
  ChevronLeft,
  LucideFlagTriangleLeft,
  Plus,
  Underline,
} from "lucide-react";
import { useState } from "react";

type Props = {
  children: React.ReactNode;

  setCurrentBg: React.Dispatch<React.SetStateAction<string>>;
  setBgType: React.Dispatch<React.SetStateAction<"color" | "image">>;
};
type ViewType = "MENU" | "CHANGEBG" | "PHOTOS" | "COLORS";
function BoardPopOver({ children, setBgType, setCurrentBg }: Props) {
  const [currentView, setCurrentView] = useState<ViewType>("MENU");
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    "https://trello.com/assets/8f9c1323c9c16601a9a4.jpg",
    "https://trello.com/assets/8f9c1323c9c16601a9a4.jpg",
    "https://trello.com/assets/8f9c1323c9c16601a9a4.jpg",
  ]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. Дістаємо файл, який вибрав користувач
    const file = e.target.files?.[0];
    if (!file) return;

    // 2. Генерація тимчасового URL для відображення в браузері
    const localImageUrl = URL.createObjectURL(file);

    // 3. Додаємо цей URL в масив картинок
    setUploadedImages((prev) => [...prev, localImageUrl]);

    // Звільняємо пам'ять (good practice, щоб браузер не тупив при купі картинок)
    // Можна зробити трохи згодом, або коли компонент розмонтується
  };
  const handleChangeBgPhoto = (url: string) => {
    setBgType("image");
    setCurrentBg(url);
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
                {/* КАРТКА №1: Кнопка "Додати свій" (Завжди перша або остання, як тобі зручніше) */}
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

                {uploadedImages.map((url, index) => (
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
