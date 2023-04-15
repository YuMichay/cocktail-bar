import React from "react";
import { Container, Sprite, Text } from "@pixi/react";
import { createTextStyle } from "../utils/createStyles";
import { pageText } from "../utils/text";
import { arrowLeft, arrowRight } from "../images";
import { Texture } from "pixi.js";

interface RulesProps {
  width: number;
  height: number;
}

export const Rules = ({width, height}: RulesProps) => {
  const arrowLeftImage = arrowLeft;
  const arrowRightImage = arrowRight;
  const [page, setPage] = React.useState(0);
  const textStyle = createTextStyle("string");

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  console.log(page);
  return (
    <Container>
      <Text text={pageText[page]} style={textStyle} anchor={0.5} />
      <Sprite
        texture={Texture.from(arrowLeftImage)}
        x={-width / 4.2}
        interactive={page > 0 && true}
        alpha={page === 0 ? 0.5 : 1}
        cursor="pointer"
        pointerdown={() => handlePageChange(page - 1)}
      />
      <Sprite
        texture={Texture.from(arrowRightImage)}
        x={width / 4.5}
        interactive={page < 2 && true}
        alpha={page === 2 ? 0.5 : 1}
        cursor="pointer"
        pointerdown={() => handlePageChange(page + 1)}
      />
    </Container>
  );
}