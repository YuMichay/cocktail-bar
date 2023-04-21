import { Sprite } from "@pixi/react";
import { Texture } from "pixi.js";
import { OpenMenu } from "./OpenMenu";
import { observer } from "mobx-react";
import { useStore } from "../../../store/store";

export const Menu = observer(() => {
  const { AppStore, GameStore, handleIsMenuOpen } = useStore();
  const positionX = AppStore.width > 768 ? AppStore.width - 140 : AppStore.width - 40;

  return (
    <>
      {!GameStore.isMenuOpen
        ? <Sprite
            texture={Texture.from(GameStore.menuCurrentImage)}
            x={positionX}
            y={30}
            anchor={0.5}
            scale={1.2}
            eventMode="dynamic"
            cursor="pointer"
            pointerdown={handleIsMenuOpen}
        />
        : <OpenMenu />
      }
    </>
  );
})