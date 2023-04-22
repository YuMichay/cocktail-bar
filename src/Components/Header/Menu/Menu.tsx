import { Sprite } from "@pixi/react";
import { Texture } from "pixi.js";
import { observer } from "mobx-react";
import { useStore } from "../../../store/store";

export const Menu = observer(() => {
  const { GameStore, handleIsMenuOpen } = useStore();

  return (
    <Sprite
      texture={Texture.from(GameStore.menuCurrentImage)}
      x={120}
      anchor={0.5}
      scale={1.2}
      eventMode="dynamic"
      cursor="pointer"
      pointerdown={handleIsMenuOpen}
    />
  );
})