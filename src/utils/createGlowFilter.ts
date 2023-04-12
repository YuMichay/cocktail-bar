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