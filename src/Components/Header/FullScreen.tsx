import { Sprite } from "@pixi/react";
import { Texture } from "pixi.js";
import { useStore } from "../../store/store";
import { observer } from "mobx-react";

export const FullScreen = observer(() => {
  const { ImageStore, AppStore, GameStore, handleFullscreenOnOff, handleIsFullscreenOn } = useStore();
  const positionX = AppStore.width > 768 ? AppStore.width - 200 : AppStore.width - 100;

  document.addEventListener("fullscreenchange", handleIsFullscreenOn);

  return (
    <>
      <Sprite
        texture={GameStore.isFullscreenOn ? Texture.from(ImageStore.images.screenImage) : Texture.from(ImageStore.images.fullscreenImage)}
        x={positionX}
        y={30}
        anchor={0.5}
        scale={1.2}
        interactive={!GameStore.isMenuOpen}
        cursor={GameStore.isMenuOpen ? "auto" : "pointer"}
        pointerdown={handleFullscreenOnOff}
      />
    </>
  );
})