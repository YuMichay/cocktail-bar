import { Container, Graphics, Sprite } from "@pixi/react";
import { createGlowFilter } from "./createStyles";
import { Texture } from "pixi.js";
import { getRandomSlot } from "./getRandomSlots";
import { useStore } from "../store/store";

export const createRectangles = () => {
  const { AppStore } = useStore();
  const rects = [];
  const glowImageFilter = createGlowFilter(2, 0x000000);
  const rectSize = AppStore.width > 630 && AppStore.width > 425 ? 120 : AppStore.width > 425 ? 80 : 50;

  for (let row = 0; row < 5; row++) {
    for (let column = 0; column < 5; column++) {
      rects.push(
        <Container key={`${row}-${column}`} x={column * (rectSize + 1)} y={row * (rectSize + 1)}>
          <Graphics
            draw={(g) => {
              g.beginFill(0x12121C);
              g.drawRect(0, 0, rectSize, rectSize);
              g.endFill();
            }}
          />
          <Sprite
            texture={Texture.from(getRandomSlot())}
            width={rectSize}
            height={rectSize}
            filters={[glowImageFilter]}
          />
        </Container>
      );
    }
  }
  return rects;
};