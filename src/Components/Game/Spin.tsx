import { Container, Graphics, Text } from "@pixi/react";
import { observer } from "mobx-react";
import { createGlowFilter, createTextStyle } from "../../utils/createStyles";
import { useStore } from "../../stores/store";
import React from "react";

export const Spin = observer(() => {
  const { AppStore, GameStore } = useStore();
  const positionX = AppStore.isLargeScreen ? AppStore.width - 240 : AppStore.width - 120;
  const positionY = AppStore.isMediumScreen ? AppStore.height - 114 : AppStore.height - 80;
  const textStyle = createTextStyle("button");

  React.useEffect(() => {
    if (GameStore.isActive) {
      GameStore.checkWin();
    }
  }, [GameStore.isActive])

  return (
    <Container anchor={0.5} position={AppStore.isMediumScreen ? [positionX, positionY] : [AppStore.width / 2, AppStore.height - 160]}>
      <Graphics
        draw={(g) => {
          g.clear();
          g.beginFill(0x12121C);
          g.drawCircle(0, 0, AppStore.isMediumScreen ? 100 : 70);
          g.endFill();
        }}
        cursor={GameStore.isMenuOpen || GameStore.isHelpOpen ? "auto" : "pointer"}
        filters={!GameStore.isMenuOpen && !GameStore.isHelpOpen && !GameStore.isActive && GameStore.isLoaded ? [createGlowFilter(3)] : null}
        interactive={!GameStore.isMenuOpen && !GameStore.isHelpOpen && !GameStore.isActive && GameStore.isLoaded}
        pointerdown={GameStore.balance - GameStore.stake >= 0 ? GameStore.spin : () => alert("Please, refill your balance!")}
      />
      <Text
        text={"SPIN"}
        style={textStyle}
        anchor={0.5}
      />
    </Container>
  );
})