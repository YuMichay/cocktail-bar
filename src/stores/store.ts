import { makeAutoObservable } from "mobx";
import React from "react";
import { IAppStore, IGameStore, IHomePageStore, IImageStore } from "../utils/interfaces";
import { ImageStore } from "./imageStore";
import { AppStore } from "./appStore";
import { HomePageStore } from "./homePageStore";
import { GameStore } from "./gameStore";

export class Store {
  public ImageStore: IImageStore;
  public AppStore: IAppStore;
  public HomePageStore: IHomePageStore;
  public GameStore: IGameStore;

  constructor() {
    this.ImageStore = new ImageStore();
    this.AppStore = new AppStore();
    this.HomePageStore = new HomePageStore();
    this.GameStore = new GameStore();

    makeAutoObservable(this, {}, { autoBind: true });
  }

  // change to GamePage or HomePage by click
  public changePage = () => {
    this.AppStore.isPlayClicked = !this.AppStore.isPlayClicked;
    this.HomePageStore.isHovered = false;
    if (this.GameStore.isMenuOpen) {
      this.GameStore.isMenuOpen = !this.GameStore.isMenuOpen;
      this.GameStore.menuCurrentImage = this.ImageStore.images.menuImage;
    }
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
