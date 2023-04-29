import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { observer } from "mobx-react";
import { createGlowFilter, createTextStyle } from "../../utils/createStyles";
import { Texture } from "pixi.js";
import { useStore } from "../../stores/store";

export const Stake = observer(() => {
  const { ImageStore, AppStore, GameStore } = useStore();
  const textStyle = createTextStyle("string", 16, "bold");
  const borderStyle = createGlowFilter(2);
  const positionX = AppStore.isLargeScreen ? 140 : 40;

  return (
    <Container position={[AppStore.isMediumScreen ? positionX : AppStore.width / 2 - 80, AppStore.height - 70]}>
      <Graphics
          draw={(g) => {
            g.clear();
            g.beginFill(0x000000);
            g.drawRoundedRect(0, 0, 160, 60, 25);
            g.endFill();
          }}
          filters={[borderStyle]}
      />
      <Text text={`Stake:\n ¤ ${GameStore.stake}`} style={textStyle} x={60} y={12}/>
      <Sprite
        texture={Texture.from(ImageStore.images.minusImage)}
        x={20}
        y={30}
        anchor={0.5}
        scale={1.2}
        cursor={GameStore.isMenuOpen || GameStore.isHelpOpen ? "auto" : "pointer"}
        interactive={GameStore.stake >= 0.4 && !GameStore.isMenuOpen && !GameStore.isHelpOpen}
        pointerdown={GameStore.handleDecrease}
      />
      <Sprite
        texture={Texture.from(ImageStore.images.plusImage)}
        x={140}
        y={30}
        anchor={0.5}
        scale={1.2}
        cursor={GameStore.isMenuOpen || GameStore.isHelpOpen ? "auto" : "pointer"}
        interactive={GameStore.stake <= 9.8 && !GameStore.isMenuOpen && !GameStore.isHelpOpen}
        pointerdown={GameStore.handleIncrease}
      />
    </Container>
  );
});