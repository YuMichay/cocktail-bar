import React from "react";
import { Container, Graphics } from "@pixi/react";
import { Balance } from "./Balance";
import { Volume } from "./Volume";
import { FullScreen } from "./FullScreen";
import { Menu } from "./Menu";
import { Help } from "./Help";

interface GameProps {
  width: number;
  height: number;
  onClick: () => void;
  isFullscreenOn: boolean;
  setIsFullscreenOn: (value: boolean) => void;
}

export const Game = ({width, height, onClick, isFullscreenOn, setIsFullscreenOn}: GameProps) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isHelpOpen, setIsHelpOpen] = React.useState(false);

  return (
  <Container anchor={0.5}>
    <Container >
      <Graphics
        draw={(g) => {
          g.beginFill(0x000000, 0.7);
          g.drawRect(0, 0, width, 60);
          g.endFill();
        }}
      />
      <Balance balance={100} />
      <Volume width={width} isMenuOpen={isMenuOpen} />
      <FullScreen width={width} isMenuOpen={isMenuOpen} isFullscreenOn={isFullscreenOn} setIsFullscreenOn={setIsFullscreenOn} />
      <Menu
        width={width}
        height={height}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isHelpOpen={isHelpOpen}
        setIsHelpOpen={setIsHelpOpen}
        changePage={onClick}
      />
      { isHelpOpen && <Help width={width} height={height} setIsHelpOpen={setIsHelpOpen} /> }
    </Container>
    <Container></Container>
  </Container>
  );
}