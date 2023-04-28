import { Sprite } from "@pixi/react";
import { Texture } from "pixi.js";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react";

export const Volume = observer(() => {
  const { GameStore } = useStore();

  return (
    <Sprite
      texture={Texture.from(GameStore.volumeCurrentImage)}
      anchor={0.5}
      scale={1.2}
      interactive={!GameStore.isMenuOpen}
      cursor={GameStore.isMenuOpen ? "auto" : "pointer"}
      pointerdown={GameStore.handleVolumeOnOff}
    />
  );
});