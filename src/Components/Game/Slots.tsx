import { Container, Graphics, Sprite } from "@pixi/react";
import { useStore } from "../../store/store";
import { createGlowFilter } from "../../utils/createStyles";
import { observer } from "mobx-react";

export const Slots = observer(() => {
  const { AppStore, GameStore, generateSlotsTextures } = useStore();
  const rects: JSX.Element[] = [];
  const glowImageFilter = createGlowFilter(2, 0x000000);
  const rectSize = AppStore.width > 630 && AppStore.width > 425 ? 120 : AppStore.width > 425 ? 80 : 50;
  generateSlotsTextures();

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
            texture={GameStore.slots[row][column]}
            width={rectSize}
            height={rectSize}
            filters={[glowImageFilter]}
          />
        </Container>
      );
    }
  }
  return ( <>{rects}</> );
});