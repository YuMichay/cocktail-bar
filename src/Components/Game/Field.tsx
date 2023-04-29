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
  const positionY = AppStore.isMediumScreen ? 292 : 192;
  const positionX = AppStore.isMediumScreen ? 302 : AppStore.isSmallScreen ? 202 : 122;
  const sizeGraphics = AppStore.isMediumScreen ? 617 : AppStore.isSmallScreen ? 417 : 267;

  return (
    <StoreContext.Provider value={store}>
      <Container>
        <Container position={[AppStore.width / 2 - positionX, AppStore.height / 2 - positionY]}>
          <Graphics
            draw={(g) => {
              g.clear();
              g.beginFill(0x000000);
              g.drawRect(-5, -5, sizeGraphics, sizeGraphics);
              g.endFill();
            }}
            filters={[glowFilter]}
          />
          <Slots />
        </Container>
        <Stake />
        <Spin />
      </Container>
    </StoreContext.Provider>
  );
});