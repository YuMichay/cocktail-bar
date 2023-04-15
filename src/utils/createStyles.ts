import { TextStyle } from "pixi.js";
import { GlowFilter } from "@pixi/filter-glow";

export function createGlowFilter(strength: number) {
  return new GlowFilter({
    distance: 15,
    outerStrength: strength,
    innerStrength: strength,
    color: 0xff1694,
    quality: 0.1,
  });
} 

export const createTextStyle = (type: string) => {
  switch(type) {
    case "button":
      return new TextStyle({
        fontFamily: "Montserrat",
        fontSize: 36,
        fill: "transparent",
        stroke: 0x7ab4ff,
        strokeThickness: 3,
        dropShadow: true,
        dropShadowColor: 0x000000,
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
      });
    case "heading":
      return new TextStyle({
        fontFamily: "Montserrat",
        fontSize: 14,
        fontWeight: "bold",
        fill: 0x7ab4ff,
      });
    case "string":
      return new TextStyle({
        fontFamily: "Montserrat",
        fontSize: 16,
        fill: 0xFFFFFF,
        wordWrapWidth: window.innerWidth / 2.5,
        wordWrap: true,
        breakWords: true,
      });
  }
}