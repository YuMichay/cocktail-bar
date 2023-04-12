import { TextStyle } from "pixi.js";

export const createTextStyle = () => {
  return new TextStyle({
    fontFamily: "Montserrat",
    fontSize: 36,
    fill: "transparent",
    stroke: 0x7792E1,
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: 0x000000,
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
  });
}