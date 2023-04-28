import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { Texture } from "pixi.js";
import { createTextStyle } from "../../../utils/createStyles";
import { useStore } from "../../../stores/store";
import { observer } from "mobx-react";

export const OpenMenu = observer(() => {
  const textStyle = createTextStyle("string");
  const { ImageStore, AppStore, GameStore, changePage } = useStore();
  const width = AppStore.isMediumScreen ? 350 : 250;
  const positionX = AppStore.isMediumScreen ? AppStore.width - 280 : AppStore.width - 180;
  const positionXExit = AppStore.isMediumScreen ? AppStore.width - 140 : AppStore.width - 40;
  const positionXHome = AppStore.isMediumScreen ? AppStore.width - 240 : AppStore.width - 140;
  const positionXHelp = AppStore.isMediumScreen ? AppStore.width - 245 : AppStore.width - 145;

  return (
  <Container>
    <Graphics
      draw={(g) => {
        g.beginFill(0x000000, 0.3);
        g.drawRect(0, 0, AppStore.width - width, AppStore.height);
        g.endFill();
      }}
      eventMode="dynamic"
      pointerdown={GameStore.handleIsMenuOpen}
    />
    <Graphics
      draw={(g) => {
        g.beginFill(0x000000, 0.9);
        g.drawRect(AppStore.width - width, 0, width, AppStore.height);
        g.endFill();
      }}
    />
    <Sprite
      texture={Texture.from(GameStore.menuCurrentImage)}
      x={positionXExit}
      y={30}
      anchor={0.5}
      scale={1.2}
      eventMode="dynamic"
      cursor="pointer"
      pointerdown={GameStore.handleIsMenuOpen}
    />
    <Container>
      <Sprite texture={Texture.from(ImageStore.images.homeImage)} x={positionX} y={60} anchor={0.5} />
      <Text
        text="Home"
        style={textStyle}
        x={positionXHome}
        y={60}
        anchor={0.5}
        eventMode="dynamic"
        cursor="pointer"
        pointerdown={changePage}
      />
    </Container>
    <Container>
      <Sprite texture={Texture.from(ImageStore.images.helpImage)} x={positionX} y={110} anchor={0.5} />
      <Text
        text="Help"
        style={textStyle}
        x={positionXHelp}
        y={110}
        anchor={0.5}
        eventMode="dynamic"
        cursor="pointer"
        pointerdown={GameStore.openHelp}
      />
    </Container>
  </Container>
  )
})