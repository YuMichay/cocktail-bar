import { GlowFilter } from "@pixi/filter-glow";
export interface IImageStore {
  images: {
    loadingImage: string;
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
    buyImage: string;
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
  isLoading: boolean;
  isPlayClicked: boolean;
  handleResize: () => void;
  isLargeScreen: boolean;
  isMediumScreen: boolean;
  isSmallScreen: boolean;
}
export interface IHomePageStore {
  glowFilter: null | GlowFilter;
  strength: number;
  isHovered: boolean;
  buttonGlowFilter: null | GlowFilter;
  setGlowFilter: (value: GlowFilter) => void;
  changeStrength: (value: number) => void;
  handleMouseOver: () => void;
  handleMouseOut: () => void;
}
export interface IGameStore {
  balance: number;
  stake: number;
  buySum: number;
  win: string;
  isMenuOpen: boolean;
  isHelpOpen: boolean;
  isBuyOpen: boolean;
  page: number;
  isFullscreenOn: boolean;
  isVolumeOn: boolean;
  volumeCurrentImage: string;
  menuCurrentImage: string;
  slots: string[];
  slotsIds: number[];
  winImages: ImageCount;
  isActive: boolean;
  isLoaded: boolean;
  isPinkGirlActive: boolean;
  isRedGirlActive: boolean;
  isYellowGirlActive: boolean;
  slotsCosts: number[];
  slotsAlpha: number;
  handleVolumeOnOff: () => void;
  handleFullscreenOnOff: () => void;
  handleIsFullscreenOn: () => void;
  handleIsMenuOpen: () => void;
  openHelp: () => void;
  closeHelp: () => void;
  openBuy: () => void;
  closeBuy: () => void;
  handlePageChange: (page: number) => void;
  handleIncrease: () => void;
  handleDecrease: () => void;
  handleBuyIncrease: () => void;
  handleBuyDecrease: () => void;
  buyCurrency: () => void;
  generateSlotsSources: () => void;
  checkWin: () => void;
  spin: () => void;
}
export interface ImageCount {
  [key: string]: number;
}