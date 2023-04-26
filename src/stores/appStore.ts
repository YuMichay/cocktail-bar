import { makeAutoObservable } from "mobx";
import { IAppStore } from "../utils/interfaces";

export class AppStore {
  public width: IAppStore["width"];
  public height: IAppStore["height"];
  public isLoading: IAppStore["isLoading"];
  public isPlayClicked: IAppStore["isPlayClicked"];

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.isLoading = true;
    this.isPlayClicked = false;

    makeAutoObservable(this, {}, { autoBind: true });
  }

  // resize handler
  public handleResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  };
}