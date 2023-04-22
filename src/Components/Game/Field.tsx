import { Container, Graphics } from "@pixi/react";
import { observer } from "mobx-react";
import { useStore } from "../../store/store";
import { createGlowFilter } from "../../utils/createStyles";
import { Stake } from "./Stake";
import { Spin } from "./Spin";
import { Slots } from "./Slots";

export const Field = observer(() => {
  const { ImageStore, AppStore, GameStore, handleIncrease, handleDecrease, spin } = useStore();
  const glowFilter = createGlowFilter(2);
  const positionY = AppStore.width > 768 ? 292 : 354;
  const positionX = AppStore.width > 630 && AppStore.width > 425 ? 302 : AppStore.width > 425 ? 202 : 122;
  const sizeGraphics = AppStore.width > 630 && AppStore.width > 425 ? 617 : AppStore.width > 425 ? 407 : 267;

  return (
    <Container anchor={0.5} width={AppStore.width} height={AppStore.height}>
      <Container position={[AppStore.width / 2 - positionX, AppStore.height / 2 - positionY]}>
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
        <Stake ImageStore={ImageStore} AppStore={AppStore} GameStore={GameStore} handleIncrease={handleIncrease} handleDecrease={handleDecrease} />
        <Spin AppStore={AppStore} GameStore={GameStore} spin={spin} />
      </Container>
    </Container>
  );
});