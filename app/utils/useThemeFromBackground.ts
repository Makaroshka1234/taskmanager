// hooks/useThemeFromBackground.ts
"use client";
import { useEffect } from "react";
import { extractColors } from "extract-colors";

type RGB = [number, number, number];

function rgbToHex([r, g, b]: RGB): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function getBrightness([r, g, b]: RGB): number {
  return (r * 299 + g * 587 + b * 114) / 1000;
}

function applyPalette(dominant: RGB, secondary: RGB) {
  const brightness = getBrightness(dominant);
  const root = document.documentElement;

  root.style.setProperty("--bg-boardheader-primary", rgbToHex(dominant));
  root.style.setProperty("--bg-btn-primary", rgbToHex(secondary));
  root.style.setProperty("--accent", rgbToHex(dominant));
  root.style.setProperty("--card-bg", `rgba(${dominant.join(",")}, 0.12)`);
  root.style.setProperty(
    "--text-primary",
    brightness > 128 ? "oklch(0.145 0 0)" : "oklch(0.985 0 0)",
  );
}

interface UseThemeFromBackgroundParams {
  backgroundType: "IMAGE" | "COLOR" | undefined;
  backgroundImageUrl?: string | null;
  backgroundColor?: string | null;
}

type testType = {
  name: string;
};

export function useThemeFromBackground({
  backgroundType,
  backgroundImageUrl,
  backgroundColor,
}: UseThemeFromBackgroundParams): void {
  useEffect(() => {
    let cancelled = false;

    if (backgroundType === "COLOR" && backgroundColor) {
      const dominant = hexToRgb(backgroundColor);
      applyPalette(dominant, dominant);
      return;
    }

    if (backgroundType === "IMAGE" && backgroundImageUrl) {
      extractColors(backgroundImageUrl)
        .then((colors) => {
          if (cancelled || colors.length === 0) return;

          const dominant: RGB = [
            colors[0].red,
            colors[0].green,
            colors[0].blue,
          ];
          const secondaryColor = colors[1] ?? colors[0];
          const secondary: RGB = [
            secondaryColor.red,
            secondaryColor.green,
            secondaryColor.blue,
          ];

          applyPalette(dominant, secondary);
        })
        .catch((err) => {
          console.error("Не вдалось витягнути кольори із зображення:", err);
        });
    }

    return () => {
      cancelled = true;
    };
  }, [backgroundType, backgroundImageUrl, backgroundColor]);
}
