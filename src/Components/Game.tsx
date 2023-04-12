import { Container, Sprite } from "@pixi/react";

interface GameProps {
  width: number;
  height: number;
  onClick: () => void;
}

export const Game = ({width, height, onClick}: GameProps) => {
  return (<Container anchor={0.5}></Container>);
}