import { GlowFilter } from "@pixi/filter-glow";
import { ColorMatrixFilter } from "@pixi/filter-color-matrix";
import { TextStyle, TextStyleFontWeight } from "pixi.js";

export function createGlowFilter(strength: number, color: number = 0xff1694) {
  return new GlowFilter({
    distance: 15,
    outerStrength: strength,
    innerStrength: strength,
    color: color,
    quality: 0.1,
  });
}

export function createColorMatrixFilter() {
  return new ColorMatrixFilter().brightness(0.8, true);
}

export const createTextStyle = (type: string, size?: number, weight?: TextStyleFontWeight) => {
  switch(type) {
    case "button":
      return new TextStyle({
        fontFamily: "Montserrat",
        fontSize: size ? size : 36,
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
        fontSize: size ? size : 16,
        fill: 0xFFFFFF,
        fontWeight: weight ? weight : "normal",
        wordWrapWidth: window.innerWidth / 2.5,
        wordWrap: true,
        breakWords: true,
      });
    case "winString":
      return new TextStyle({
        fontFamily: "Montserrat",
        fontSize: size ? size : 26,
        fill: "transparent",
        stroke: 0x7ab4ff,
        strokeThickness: 3,
      });
  }
}