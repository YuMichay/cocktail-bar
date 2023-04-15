import React from "react";
import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { Texture } from "pixi.js";
import { helpImage, homeImage } from "../images";
import { createTextStyle } from "../utils/createStyles";

interface OpenMenuProps {
  width: number;
  height: number;
  exitMenu: string;
  openCloseMenu: () => void;
  changePage: () => void;
  isHelpOpen: boolean;
  openCloseHelp: (value: boolean) => void;
}

export const OpenMenu = ({ width, height, exitMenu, openCloseMenu, changePage, isHelpOpen, openCloseHelp }: OpenMenuProps) => {
  const textStyle = createTextStyle("string");
  const home = homeImage;
  const help = helpImage;

  const openHelp = React.useCallback(() => {
    openCloseMenu();
    openCloseHelp(true);
  }, []);

  return (
  <Container>
    <Graphics
      draw={(g) => {
        g.beginFill(0x000000, 0.3);
        g.drawRect(0, 0, width - 250, height);
        g.endFill();
      }}
      interactive={true}
      pointerdown={openCloseMenu}
    />
    <Graphics
      draw={(g) => {
        g.beginFill(0x000000, 0.9);
        g.drawRect(width - 250, 0, 250, height);
        g.endFill();
      }}
    />
    <Sprite
      texture={Texture.from(exitMenu)}
      x={width - 40}
      y={30}
      anchor={0.5}
      scale={1.2}
      interactive={true}
      cursor="pointer"
      pointerdown={openCloseMenu}
    />
    <Container>
      <Sprite texture={Texture.from(home)} x={width - 180} y={60} anchor={0.5} />
      <Text
        text="Home"
        style={textStyle}
        x={width - 140}
        y={60}
        anchor={0.5}
        interactive={true}
        cursor="pointer"
        pointerdown={changePage}
      />
    </Container>
    <Container>
      <Sprite texture={Texture.from(help)} x={width - 180} y={110} anchor={0.5} />
      <Text
        text="Help"
        style={textStyle}
        x={width - 145}
        y={110}
        anchor={0.5}
        interactive={true}
        cursor="pointer"
        pointerdown={openHelp}
      />
    </Container>
  </Container>
  )
}