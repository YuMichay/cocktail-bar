import React from "react";
import { Sprite } from "@pixi/react";
import { fullscreenImage, screenImage } from "../images";
import { Texture } from "pixi.js";

interface FullScreenProps {
  width: number;
  isMenuOpen: boolean;
  isFullscreenOn: boolean;
  setIsFullscreenOn: (value: boolean) => void;
}

export const FullScreen = ({ width, isMenuOpen, isFullscreenOn, setIsFullscreenOn }: FullScreenProps) => {
  const fullscreen = fullscreenImage;
  const screen = screenImage;

  // fullscreen on or off
  const handleClick = React.useCallback(() => {
    setIsFullscreenOn(!isFullscreenOn);
    if (!isFullscreenOn) {
      document.querySelector("canvas")?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, [isFullscreenOn]);

  return (
    <>
      <Sprite
        texture={!isFullscreenOn ? Texture.from(fullscreen) : Texture.from(screen)}
        x={width - 100}
        y={30}
        anchor={0.5}
        scale={1.2}
        interactive={!isMenuOpen}
        cursor={!isMenuOpen ? "pointer" : "none"}
        pointerdown={handleClick}
      />
    </>
  );
}