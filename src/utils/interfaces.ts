import { GlowFilter } from "@pixi/filter-glow";
import { Resource, Texture } from "pixi.js";

export interface IImageStore {
  images: {
    backgroundImage: string;
    backgroundVerticalImage: string;
    logoImage: string;
    volumeImage: string;
    muteImage: string;
    fullscreenImage: string;
    screenImage: string;
    menuImage: string;
    exitImage: string;
    homeImage: string;
    helpImage: string;
    arrowLeft: string;
    arrowRight: string;
    plusImage: string;
    minusImage: string;
  };
  slots: string[];
} 

export interface IAppStore {
  width: number;
  height: number;
  isPlayClicked: boolean;
}

export interface IHomePageStore {
  glowFilter: null | GlowFilter;
  strength: number;
  isHovered: boolean;
  buttonGlowFilter: null | GlowFilter;
}

export interface IGameStore {
  balance: number;
  stake: number;
  isMenuOpen: boolean;
  isHelpOpen: boolean;
  isFullscreenOn: boolean;
  isVolumeOn: boolean;
  volumeCurrentImage: string;
  menuCurrentImage: string;
  slots: Texture<Resource>[][];
  isActive: boolean;
}

export interface IRulesStore {
  page: number;
}