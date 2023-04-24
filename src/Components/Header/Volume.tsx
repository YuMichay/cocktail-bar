import { Sprite } from "@pixi/react";
import { Texture } from "pixi.js";
import { useStore } from "../../store/store";
import { observer } from "mobx-react";
import React from "react";

export const Volume = observer(() => {
  const { GameStore, handleVolumeOnOff } = useStore();

  React.useEffect(() => {
    if (GameStore.isVolumeOn) {
      document.querySelector("audio")?.play();
    }
  }, [])

  return (
    <Sprite
      texture={Texture.from(GameStore.volumeCurrentImage)}
      anchor={0.5}
      scale={1.2}
      interactive={!GameStore.isMenuOpen}
      cursor={GameStore.isMenuOpen ? "auto" : "pointer"}
      pointerdown={handleVolumeOnOff}
    />
  );
});