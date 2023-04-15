import { Container, Graphics, Sprite } from "@pixi/react";
import { Texture } from "pixi.js";
import { Rules } from "./Rules";
import { createGlowFilter } from "../utils/createStyles";
import { exitImage } from "../images";

interface HelpProps {
  width: number;
  height: number;
  setIsHelpOpen: (value: boolean) => void;
}

export const Help = ({ width, height, setIsHelpOpen }: HelpProps) => {
  const exitHelp = exitImage;

  return (
    <>
      <Graphics
        draw={(g) => {
          g.beginFill(0x000000, 0.3);
          g.drawRect(0, 0, width, height);
          g.endFill();
        }}
        interactive={true}
        pointerdown={() => setIsHelpOpen(false)}
      />
      <Container position={[width / 2, height / 2]} width={width / 2} height={height / 1.5}>
        <Graphics
          draw={(g) => {
            g.beginFill(0x12121C, 1);
            g.drawRect(-width / 4, -height / 3, width / 2, height / 1.5);
            g.endFill();
          }}
          filters={[createGlowFilter(3)]}
          eventMode="static"
        />
        <Sprite
          texture={Texture.from(exitHelp)}
          x={width / 4 - 40}
          y={-height / 3 + 10}
          scale={1.2}
          interactive={true}
          cursor="pointer"
          pointerdown={() => setIsHelpOpen(false)}
        />
        <Rules width={width} height={height} />
      </Container>
    </>
  );
}