import { Container, Graphics, Sprite, _ReactPixi, Text } from "@pixi/react";
import { Texture } from "pixi.js";
import { createGlowFilter, createTextStyle } from "../../utils/createStyles";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react";

export const Buy = observer(() => {
  const { ImageStore, AppStore, GameStore } = useStore();
  const buttonStyle = AppStore.isSmallScreen ? createTextStyle("button") : createTextStyle("button", 30);
  const textStyle = createTextStyle("string", 26, "bold");
  const positionX = AppStore.isLargeScreen ? 140 : 40;

  return (
    <>
      <Graphics
        draw={(g) => {
          g.clear();
          g.beginFill(0x000000, 0.3);
          g.drawRect(0, 0, AppStore.width, AppStore.height);
          g.endFill();
        }}
        interactive={true}
        pointerdown={GameStore.closeBuy}
      />
      <Container anchor={0.5} position={[AppStore.isMediumScreen ? AppStore.width / 4 : AppStore.isSmallScreen ? AppStore.width / 6 : 20, AppStore.height / 4]}>
        <Graphics
          anchor={0.5}
          draw={(g) => {
            g.clear();
            g.beginFill(0x12121C, 1);
            g.drawRect(0, 0, AppStore.isMediumScreen ? AppStore.width / 2 : AppStore.isSmallScreen ? AppStore.width / 1.5 : AppStore.width - 40, AppStore.height / 2);
            g.endFill();
          }}
          filters={[createGlowFilter(3)]}
          eventMode="static"
        />
        <Sprite
          texture={Texture.from(ImageStore.images.exitImage)}
          x={AppStore.isMediumScreen ? AppStore.width / 2.1 : AppStore.isSmallScreen ? AppStore.width / 1.6 : AppStore.width - 80}
          y={10}
          scale={1.2}
          interactive={true}
          cursor="pointer"
          pointerdown={GameStore.closeBuy}
        />
      </Container>
      <Container position={[AppStore.isMediumScreen ? positionX : AppStore.width / 2 - 80, AppStore.height / 2 - 80]}>
        <Text text={`${GameStore.buySum}`} anchor={0.5} style={textStyle} x={80} y={30} />
        <Sprite
          texture={Texture.from(ImageStore.images.minusImage)}
          x={20}
          y={30}
          anchor={0.5}
          scale={1.2}
          cursor="pointer"
          interactive={GameStore.stake >= 0}
          pointerdown={GameStore.handleBuyDecrease}
        />
        <Sprite
          texture={Texture.from(ImageStore.images.plusImage)}
          x={140}
          y={30}
          anchor={0.5}
          scale={1.2}
          cursor="pointer"
          interactive={GameStore.stake <= 1000}
          pointerdown={GameStore.handleBuyIncrease}
        />
      </Container>
      <Container position={[AppStore.width / 2, AppStore.height / 2 + 80]}>
        <Sprite
            texture={Texture.WHITE}
            width={AppStore.isSmallScreen ? 200 : 150}
            height={80}
            anchor={0.5}
            tint={0x000000}
            interactive={GameStore.stake > 0 && GameStore.stake <= 1000}
            pointerdown={GameStore.buyCurrency}
          />
        <Text text="Buy" anchor={0.5} style={buttonStyle} />
      </Container>
    </>
  );
});