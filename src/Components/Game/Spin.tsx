import { Container, Graphics, Text } from "@pixi/react";
import { observer } from "mobx-react";
import { createGlowFilter, createTextStyle } from "../../utils/createStyles";
import { IAppStore, IGameStore } from "../../utils/interfaces";

interface SpinProps {
  AppStore: IAppStore;
  GameStore: IGameStore;
  spin: () => void;
}

export const Spin = observer(({AppStore, GameStore, spin}: SpinProps) => {
  const textStyle = createTextStyle("button");
  const positionX = AppStore.width > 768 ? AppStore.width - 240 : AppStore.width - 140;

  return (
    <Container anchor={0.5} position={AppStore.width > 426 ? [positionX, AppStore.height - 114] : [AppStore.width / 2, AppStore.height - 200]}>
      <Graphics
        draw={(g) => {
          g.clear();
          g.beginFill(0x12121C);
          g.drawCircle(0, 0, AppStore.width > 425 ? 100 : 70);
          g.endFill();
        }}
        cursor={GameStore.isMenuOpen || GameStore.isHelpOpen ? "auto" : "pointer"}
        filters={(GameStore.isMenuOpen || GameStore.isHelpOpen || GameStore.isActive) ? null : [createGlowFilter(3)]}
        interactive={!GameStore.isMenuOpen && !GameStore.isHelpOpen && !GameStore.isActive}
        pointerdown={spin}
      />
      <Text
        text={"SPIN"}
        style={textStyle}
        anchor={0.5}
      />
    </Container>
  );
})