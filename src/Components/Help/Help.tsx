import { Container, Graphics, Sprite } from "@pixi/react";
import { Texture } from "pixi.js";
import { Rules } from "./Rules";
import { createGlowFilter } from "../../utils/createStyles";
import { useStore } from "../../store/store";
import { observer } from "mobx-react";

export const Help = observer(() => {
  const { ImageStore, AppStore, closeHelp } = useStore();

  return (
    <>
      <Graphics
        draw={(g) => {
          g.beginFill(0x000000, 0.3);
          g.drawRect(0, 0, AppStore.width, AppStore.height);
          g.endFill();
        }}
        interactive={true}
        pointerdown={closeHelp}
      />
      <Container anchor={0.5} position={AppStore.width > 768 ? [AppStore.width / 4, AppStore.height / 4] : [AppStore.width / 6, AppStore.height / 6]}>
        <Graphics
          anchor={0.5}
          draw={(g) => {
            g.beginFill(0x12121C, 1);
            g.drawRect(0, 0, AppStore.width > 768 ? AppStore.width / 2 : AppStore.width / 1.5, AppStore.width > 768 ? AppStore.height / 2 : AppStore.height / 1.5);
            g.endFill();
          }}
          filters={[createGlowFilter(3)]}
          eventMode="static"
        />
        <Sprite
          texture={Texture.from(ImageStore.images.exitImage)}
          x={AppStore.width > 768 ? AppStore.width / 2.1 : AppStore.width / 1.6}
          y={10}
          scale={1.2}
          interactive={true}
          cursor="pointer"
          pointerdown={closeHelp}
        />
        <Rules />
      </Container>
    </>
  );
});