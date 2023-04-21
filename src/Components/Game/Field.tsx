import { Container, Graphics, Sprite } from "@pixi/react";
import { observer } from "mobx-react";
import { useStore } from "../../store/store";
import { createGlowFilter } from "../../utils/createStyles";
import { Stake } from "./Stake";
import { Spin } from "./Spin";
import { createRectangles } from "../../utils/createRectangles";
import React from "react";

export const Field = observer(() => {
  const { ImageStore, AppStore, GameStore, handleIncrease, handleDecrease, spin } = useStore();
  const glowFilter = createGlowFilter(2);
  const positionY = AppStore.width > 768 ? 304 : 354;
  const positionX = AppStore.width > 630 && AppStore.width > 425 ? 304 : AppStore.width > 425 ? 204 : 129;
  const sizeGraphics = AppStore.width > 630 && AppStore.width > 425 ? 619 : AppStore.width > 425 ? 419 : 269;

  GameStore.slots = createRectangles();
  
  return (
    <Container anchor={0.5}>
      <Container anchor={0.5} position={[AppStore.width / 2 - positionX, AppStore.height / 2 - positionY]} width={AppStore.width}>
        <Graphics
          draw={(g) => {
            g.beginFill(0x000000);
            g.drawRect(-10, -10, sizeGraphics, sizeGraphics);
            g.endFill();
          }}
          filters={[glowFilter]}
        />
        {GameStore.slots}
      </Container>
      <Container>
        <Stake ImageStore={ImageStore} AppStore={AppStore} GameStore={GameStore} handleIncrease={handleIncrease} handleDecrease={handleDecrease} />
        <Spin AppStore={AppStore} GameStore={GameStore} spin={spin} />
      </Container>
    </Container>
  );
});