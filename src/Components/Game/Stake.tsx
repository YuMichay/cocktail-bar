import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { observer } from "mobx-react";
import { createTextStyle } from "../../utils/createStyles";
import { Texture } from "pixi.js";
import { IAppStore, IGameStore, IImageStore } from "../../utils/interfaces";
import { useStore } from "../../store/store";

// interface StakeProps {
//   ImageStore: IImageStore;
//   AppStore: IAppStore;
//   GameStore: IGameStore;
//   handleIncrease: () => void;
//   handleDecrease: () => void;
// }

export const Stake = observer(() => {
  const { ImageStore, AppStore, GameStore, handleIncrease, handleDecrease } = useStore();
  const textStyle = createTextStyle("boldString");
  const positionX = AppStore.width > 1024 ? 140 : 40;

  return (
    <Container position={[AppStore.width > 768 ? positionX : AppStore.width / 2 - 80, AppStore.height - 70]}>
      <Graphics
          draw={(g) => {
            g.beginFill(0x000000, 0.7);
            g.drawRoundedRect(0, 0, 160, 60, 25);
            g.endFill();
          }}
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
        pointerdown={handleDecrease}
      />
      <Sprite
        texture={Texture.from(ImageStore.images.plusImage)}
        x={140}
        y={30}
        anchor={0.5}
        scale={1.2}
        cursor={GameStore.isMenuOpen || GameStore.isHelpOpen ? "auto" : "pointer"}
        interactive={GameStore.stake <= 9.8 && !GameStore.isMenuOpen && !GameStore.isHelpOpen}
        pointerdown={handleIncrease}
      />
    </Container>
  );
});