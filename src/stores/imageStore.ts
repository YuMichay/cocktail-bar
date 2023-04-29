import { makeAutoObservable } from "mobx";
import { IImageStore } from "../utils/interfaces";

export class ImageStore {
  public images: IImageStore["images"];
  public slots: IImageStore["slots"];

  constructor() {
    this.images = {
      loadingImage: "assets/loading.svg",
      backgroundImage: "assets/background.jpg",
      backgroundVerticalImage: "assets/background-vertical.jpg",
      logoImage: "assets/home-background.jpg",
      volumeImage: "assets/volume-2.svg",
      muteImage: "assets/volume-x.svg",
      fullscreenImage: "assets/maximize.svg",
      screenImage: "assets/minimize.svg",
      menuImage: "assets/menu.svg",
      exitImage: "assets/x.svg",
      homeImage: "assets/home.svg",
      helpImage: "assets/help-circle.svg",
      buyImage: "assets/shopping-bag.svg",
      arrowLeft: "assets/arrow-left-circle.svg",
      arrowRight: "assets/arrow-right-circle.svg",
      plusImage: "assets/plus-circle.svg",
      minusImage: "assets/minus-circle.svg",
    };
    this.slots = [
      "assets/cocktail1.png",
      "assets/cocktail2.png",
      "assets/pink-cocktail.png",
      "assets/red-cocktail.png",
      "assets/yellow-cocktail.png",
      "assets/pink-girl.png",
      "assets/red-girl.png",
      "assets/yellow-girl.png"
    ];
    
    makeAutoObservable(this, {}, { autoBind: true });
  }
}