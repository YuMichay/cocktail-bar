import { Container, Sprite } from "@pixi/react";
import { useStore } from "../../stores/store";
import { createGlowFilter } from "../../utils/createStyles";
import { observer } from "mobx-react";
import { Texture } from "pixi.js";

export const Slots = observer(() => {
  const { ImageStore, AppStore, GameStore } = useStore();
  let rectSize = AppStore.width > 768 ? 120 : AppStore.width > 425 ? 80 : 50;
  const glowFilter = [createGlowFilter(2, 0x000000)];
  const winGlowFilter = [createGlowFilter(2)];
  
  if (!GameStore.slots.length) {
    GameStore.generateSlotsSources();
  }

  return (
    <Container>
      {GameStore.slots.map((source, index) => {
      const isWinningSprite = Object.hasOwn(GameStore.winImages, ImageStore.slots.indexOf(source));
      const filters = isWinningSprite ? winGlowFilter : glowFilter;
      
      return (
          <Sprite
            key={index}
            texture={Texture.from(source)}
            width={rectSize}
            height={rectSize}
            x={(index % 5) * rectSize + 1}
            y={Math.floor(index / 5) * rectSize + 1}
            filters={filters}
            alpha={GameStore.slotsAlpha}
          />
        )
      })}
    </Container>
  );
});