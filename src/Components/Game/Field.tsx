import { Container, Graphics, Sprite } from "@pixi/react";
import { observer } from "mobx-react";
import { StoreContext, useStore } from "../../stores/store";
import { createGlowFilter } from "../../utils/createStyles";
import { Stake } from "./Stake";
import { Spin } from "./Spin";
import { Slots } from "./Slots";

export const Field = observer(() => {
  const store = useStore();
  const { AppStore } = store;
  const glowFilter = createGlowFilter(2);
  const positionX = AppStore.width > 768 ? 302 : AppStore.width > 425 ? 202 : 122;
  const sizeGraphics = AppStore.width > 768 ? 617 : AppStore.width > 425 ? 417 : 267;

  return (
    <StoreContext.Provider value={store}>
      <Container anchor={0.5}>
        <Container position={[AppStore.width / 2 - positionX, AppStore.height / 2 - 292]}>
          <Graphics
            draw={(g) => {
              g.beginFill(0x000000);
              g.drawRect(-5, -5, sizeGraphics, sizeGraphics);
              g.endFill();
            }}
            filters={[glowFilter]}
          />
          <Slots />
        </Container>
        <Container>
          <Stake />
          <Spin />
        </Container>
      </Container>
    </StoreContext.Provider>
  );
});