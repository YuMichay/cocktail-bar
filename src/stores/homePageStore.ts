import { makeAutoObservable } from "mobx";
import { IHomePageStore } from "../utils/interfaces";
import { createGlowFilter } from "../utils/createStyles";
import { GlowFilter } from "pixi-filters";

export class HomePageStore {
  public glowFilter: IHomePageStore["glowFilter"];
  public strength: IHomePageStore["strength"];
  public isHovered: IHomePageStore["isHovered"];
  public buttonGlowFilter: IHomePageStore["buttonGlowFilter"];

  constructor() {
    this.glowFilter = null;
    this.strength = 0;
    this.isHovered = false;
    this.buttonGlowFilter = null;

    makeAutoObservable(this, {}, { autoBind: true });
  }

    // glowing border for HomePage image
    public setGlowFilter(value: GlowFilter) {
      this.glowFilter = value;
    }
  
    // for glowing effect
    public changeStrength = (value: number) => {
      this.strength = value;
    }
  
    // effects for Play button on HomePage
    public handleMouseOver = () => {
      this.isHovered = true;
      this.buttonGlowFilter = createGlowFilter(2);
    }
  
    public handleMouseOut = () => {
      this.isHovered = false;
      this.buttonGlowFilter = null;
    }
}