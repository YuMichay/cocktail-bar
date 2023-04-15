import React from "react";
import { Sprite } from "@pixi/react";
import { muteImage, volumeImage } from "../images";
import { Texture } from "pixi.js";

interface VolumeProps {
  width: number;
  isMenuOpen: boolean;
}

export const Volume = ({ width, isMenuOpen }: VolumeProps) => {
  const volume = volumeImage;
  const mute = muteImage;

  const [isVolumeOn, setIsVolumeOn] = React.useState(true);

  // volume on or off
  const handleClick = React.useCallback(() => {
    setIsVolumeOn(!isVolumeOn);
    const audio = document.querySelector("audio")!;
    audio.muted = isVolumeOn;
  }, [isVolumeOn]);

  return (
    <>
      <Sprite
        texture={isVolumeOn ? Texture.from(volume) : Texture.from(mute)}
        x={width - 160}
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