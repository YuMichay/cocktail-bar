import { action, makeAutoObservable } from "mobx";
import React from "react";
import { IAppStore, IGameStore, IHomePageStore, IImageStore, IRulesStore } from "../utils/interfaces";
import { createGlowFilter } from "../utils/createStyles";
import { GlowFilter } from "@pixi/filter-glow";
import { Texture } from "pixi.js";
import { getRandomSlot } from "../utils/getRandomSlots";

export class Store {
  public ImageStore: IImageStore;
  public AppStore: IAppStore;
  public HomePageStore: IHomePageStore;
  public GameStore: IGameStore;
  public RulesStore: IRulesStore;

  constructor() {
    this.ImageStore = {
      images: {
        backgroundImage: "./assets/background.jpg",
        backgroundVerticalImage: "./assets/background-vertical.jpg",
        logoImage: "./assets/home-background.jpg",
        volumeImage: "./assets/volume-2.svg",
        muteImage: "./assets/volume-x.svg",
        fullscreenImage: "./assets/maximize.svg",
        screenImage: "./assets/minimize.svg",
        menuImage: "./assets/menu.svg",
        exitImage: "./assets/x.svg",
        homeImage: "./assets/home.svg",
        helpImage: "./assets/help-circle.svg",
        arrowLeft: "./assets/arrow-left-circle.svg",
        arrowRight: "./assets/arrow-right-circle.svg",
        plusImage: "./assets/plus-circle.svg",
        minusImage: "./assets/minus-circle.svg",
      },
      slots: [
        "./assets/cocktail1.png",
        "./assets/cocktail2.png",
        "./assets/pink-cocktail.png",
        "./assets/red-cocktail.png",
        "./assets/yellow-cocktail.png",
        "./assets/pink-girl.png",
        "./assets/red-girl.png",
        "./assets/yellow-girl.png"]
    }
    this.AppStore = {
      width: window.innerWidth,
      height: window.innerHeight,
      isPlayClicked: false,
    };
    this.HomePageStore = {
      glowFilter: null,
      strength: 0,
      isHovered: false,
      buttonGlowFilter: null,
    };
    this.GameStore = {
      balance: 100,
      stake: 5,
      isMenuOpen: false,
      isHelpOpen: false,
      isFullscreenOn: false,
      isVolumeOn: true,
      volumeCurrentImage: this.ImageStore.images.volumeImage,
      menuCurrentImage: this.ImageStore.images.menuImage,
      slots: [],
      isActive: false,
    };
    this.RulesStore = { page: 0, };

    makeAutoObservable(this, {}, { autoBind: true });
  }

  // change to GamePage or HomePage by click
  public changePage = () => {
    this.AppStore.isPlayClicked = !this.AppStore.isPlayClicked;
    if (this.GameStore.isMenuOpen) {
      this.GameStore.isMenuOpen = !this.GameStore.isMenuOpen;
      this.GameStore.menuCurrentImage = this.ImageStore.images.menuImage;
    }
  }

  // general for App
  public calculateWidth = () => {
    this.AppStore.width = window.innerWidth;
  }

  public calculateHeight = () => {
    this.AppStore.height = window.innerHeight;
  }

  // glowing border for HomePage image
  public glowFilter(value: GlowFilter) {
    this.HomePageStore.glowFilter = value;
  }

  // for glowing effect
  public changeStrength = (value: number) => {
    this.HomePageStore.strength = value;
  }

  // effects for Play button on HomePage
  public handleMouseOver = () => {
    this.HomePageStore.isHovered = true;
    this.HomePageStore.buttonGlowFilter = createGlowFilter(2);
  }

  public handleMouseOut = () => {
    this.HomePageStore.isHovered = false;
    this.HomePageStore.buttonGlowFilter = null;
  }

  // mute/unmute background audio
  public handleVolumeOnOff = () => {
    this.GameStore.isVolumeOn = !this.GameStore.isVolumeOn;
    document.querySelector("audio")!.muted = !this.GameStore.isVolumeOn;
    this.GameStore.volumeCurrentImage = this.GameStore.isVolumeOn ? this.ImageStore.images.volumeImage : this.ImageStore.images.muteImage;
  }

  // fullscreen mode on or off by click
  public handleFullscreenOnOff = () => {
    if (!this.GameStore.isFullscreenOn) {
      document.querySelector("canvas")!.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    this.GameStore.isFullscreenOn = !this.GameStore.isFullscreenOn;
  }

  // check if fullscreen mode was changed by browsers key events ("Escape") 
  public handleIsFullscreenOn = () => {
    if (window.innerHeight !== window.screen.height && this.GameStore.isFullscreenOn) {
      this.GameStore.isFullscreenOn = !this.GameStore.isFullscreenOn;
    }
  }

  // open or close Menu
  public handleIsMenuOpen = () => {
    this.GameStore.isMenuOpen = !this.GameStore.isMenuOpen;
    this.GameStore.menuCurrentImage = this.GameStore.isMenuOpen ? this.ImageStore.images.exitImage : this.ImageStore.images.menuImage;
  }

  public openHelp = () => {
    this.handleIsMenuOpen();
    this.GameStore.isHelpOpen = true;
  }

  public closeHelp = () => {
    this.GameStore.isHelpOpen = false;
  }

  // for Help pages
  public handlePageChange = (page: number) => {
    this.RulesStore.page = page;
  }

  // for Stake
  public handleIncrease = () => {
    if (this.GameStore.stake <= 9.80) {
      this.GameStore.stake = Number((this.GameStore.stake + 0.20).toFixed(2));
    }
  }

  public handleDecrease = () => {
    if (this.GameStore.stake >= 0.40) {
      this.GameStore.stake = Number((this.GameStore.stake - 0.20).toFixed(2));
    }
  }

  // generate slots textures for slots
  public generateSlotsTextures = () => {
    for (let i = 0; i < 5; i++) {
      this.GameStore.slots.push([Texture.from(getRandomSlot()), Texture.from(getRandomSlot()), Texture.from(getRandomSlot()), Texture.from(getRandomSlot()), Texture.from(getRandomSlot())]);
    }
  }

  // Spin
  public spin = () => {
    this.GameStore.balance = Number((this.GameStore.balance - this.GameStore.stake).toFixed(2));
    this.GameStore.isActive = true;
    this.GameStore.slots = [];
    setTimeout(
      action(() => {
        this.GameStore.isActive = false;
      }),
      1000
    );
  }
}

export const StoreContext = React.createContext<Store | null>(null);
export const store = new Store();

export function useStore() {
  const context = React.useContext(StoreContext);
  if (!context) {
    throw new Error("Wrap element with context first!");
  }
  return context;
}
