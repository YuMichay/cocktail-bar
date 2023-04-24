import { Container, Sprite } from "@pixi/react";
import { useStore } from "../../store/store";
import { createGlowFilter } from "../../utils/createStyles";
import { observer } from "mobx-react";
import { generateSlotsTextures } from "../../utils/generateSlotsTextures";
import React from "react";

export const Slots = observer(() => {
  const { AppStore } = useStore();
  const glowImageFilter = createGlowFilter(2, 0x000000);
  const rectSize = AppStore.width > 768 ? 120 : AppStore.width > 425 ? 80 : 50;
  const slots = generateSlotsTextures();

  return (
  <>
    {slots.map((row, rowIndex) =>
      row.map((texture, columnIndex) => (
        <Container key={`${rowIndex}-${columnIndex}`} x={columnIndex * (rectSize + 1)} y={rowIndex * (rectSize + 1)}>
          <Sprite
            texture={texture}
            width={rectSize}
            height={rectSize}
            filters={[glowImageFilter]}
          />
        </Container>
      ))
    )}
  </>
  );
});