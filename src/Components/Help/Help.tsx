import { Container, Graphics, Sprite, _ReactPixi } from "@pixi/react";
import { Texture } from "pixi.js";
import { Rules } from "./Rules";
import { createGlowFilter } from "../../utils/createStyles";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react";

export const Help = observer(() => {
  const { ImageStore, AppStore, GameStore } = useStore();

  return (
    <>
      <Graphics
        draw={(g) => {
          g.clear();
          g.beginFill(0x000000, 0.3);
          g.drawRect(0, 0, AppStore.width, AppStore.height);
          g.endFill();
        }}
        interactive={true}
        pointerdown={GameStore.closeHelp}
      />
      <Container anchor={0.5} position={[AppStore.isMediumScreen ? AppStore.width / 4 : AppStore.isSmallScreen ? AppStore.width / 6 : 20, AppStore.height / 4]}>
        <Graphics
          anchor={0.5}
          draw={(g) => {
            g.clear();
            g.beginFill(0x12121C, 1);
            g.drawRect(0, 0, AppStore.isMediumScreen ? AppStore.width / 2 : AppStore.isSmallScreen ? AppStore.width / 1.5 : AppStore.width - 40, AppStore.height / 2);
            g.endFill();
          }}
          filters={[createGlowFilter(3)]}
          eventMode="static"
        />
        <Sprite
          texture={Texture.from(ImageStore.images.exitImage)}
          x={AppStore.isMediumScreen ? AppStore.width / 2.1 : AppStore.isSmallScreen ? AppStore.width / 1.6 : AppStore.width - 80}
          y={10}
          scale={1.2}
          interactive={true}
          cursor="pointer"
          pointerdown={GameStore.closeHelp}
        />
        <Rules />
      </Container>
    </>
  );
});