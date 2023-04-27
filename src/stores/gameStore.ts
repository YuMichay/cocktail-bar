import { action, makeAutoObservable } from "mobx";
import { IGameStore, IImageStore } from "../utils/interfaces";
import { ImageStore } from "./imageStore";
import { getRandomSlot } from "../utils/getRandomSlot";
import { getWinImage } from "../utils/getWinImage";

export class GameStore {
  public ImageStore: IImageStore;
  public balance: IGameStore["balance"];
  public stake: IGameStore["stake"];
  public win: IGameStore["win"];
  public isMenuOpen: IGameStore["isMenuOpen"];
  public isHelpOpen: IGameStore["isHelpOpen"];
  public page: IGameStore["page"];
  public isFullscreenOn: IGameStore["isFullscreenOn"];
  public isVolumeOn: IGameStore["isVolumeOn"];
  public volumeCurrentImage: IGameStore["volumeCurrentImage"];
  public menuCurrentImage: IGameStore["menuCurrentImage"];
  public slots: IGameStore["slots"];
  public slotsIds: IGameStore["slotsIds"];
  public winImages: IGameStore["winImages"];
  public isActive: IGameStore["isActive"];
  public isPinkGirlActive: IGameStore["isPinkGirlActive"];
  public isRedGirlActive: IGameStore["isRedGirlActive"];
  public isYellowGirlActive: IGameStore["isYellowGirlActive"];
  public slotsCosts: IGameStore["slotsCosts"];
  public slotsAlpha: IGameStore["slotsAlpha"];

  constructor() {
    this.ImageStore = new ImageStore();
    this.balance = 100;
    this.stake = 5;
    this.win = "0";
    this.isMenuOpen = false;
    this.isHelpOpen = false;
    this.page = 0;
    this.isFullscreenOn = false;
    this.isVolumeOn = true;
    this.volumeCurrentImage = this.ImageStore.images.volumeImage;
    this.menuCurrentImage = this.ImageStore.images.menuImage;
    this.slots = [];
    this.slotsIds = [];
    this.winImages = {};
    this.isActive = false;
    this.isPinkGirlActive = false;
    this.isRedGirlActive = false;
    this.isYellowGirlActive = false;
    this.slotsCosts = [ 0.20, 0.40, 0.60, 0.60, 0.60, 1.20, 1.20, 1.20];
    this.slotsAlpha = 0;

    makeAutoObservable(this, {}, { autoBind: true });
  }

    // mute/unmute background audio
    public handleVolumeOnOff = () => {
      this.isVolumeOn = !this.isVolumeOn;
      document.querySelector("audio")!.muted = !this.isVolumeOn;
      this.volumeCurrentImage = this.isVolumeOn ? this.ImageStore.images.volumeImage : this.ImageStore.images.muteImage;
      if (document.querySelector("audio")!.muted) {
        document.querySelector("audio")!.pause();
      } else {
        document.querySelector("audio")!.play();
      }
    }
  
    // fullscreen mode on or off by click
    public handleFullscreenOnOff = () => {
      if (!this.isFullscreenOn) {
        document.querySelector("canvas")!.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      this.isFullscreenOn = !this.isFullscreenOn;
    }
  
    // check if fullscreen mode was changed by browsers key events ("Escape") 
    public handleIsFullscreenOn = () => {
      if (window.innerHeight !== window.screen.height && this.isFullscreenOn) {
        this.isFullscreenOn = !this.isFullscreenOn;
      }
    }

      // open or close Menu
  public handleIsMenuOpen = () => {
    this.isMenuOpen = !this.isMenuOpen;
    this.menuCurrentImage = this.isMenuOpen ? this.ImageStore.images.exitImage : this.ImageStore.images.menuImage;
  }

  // open/close help window
  public openHelp = () => {
    this.handleIsMenuOpen();
    this.isHelpOpen = true;
  }

  public closeHelp = () => {
    this.isHelpOpen = false;
    this.page = 0;
  }

  // for Help pages
  public handlePageChange = (page: number) => {
    this.page = page;
  }

  // for Stake
  public handleIncrease = () => {
    if (this.stake <= 9.80) {
      this.stake = Number((this.stake + 0.20).toFixed(2));
    }
  }

  public handleDecrease = () => {
    if (this.stake >= 0.40) {
      this.stake = Number((this.stake - 0.20).toFixed(2));
    }
  }

  // generate slots
  public generateSlotsSources = () => {
    for (let i = 0; i < 25; i++) {
      this.slots.push(getRandomSlot());
    }
    this.interval();
  }

  // slots appearance
  public interval = () => {
    const increment = 0.01;
    const delay = 20;
    setInterval(action(() => {
      if (this.slotsAlpha < 1) {
        this.slotsAlpha += increment;
      }
    }), delay);
  }

  // check win sum
  public checkWin = () => {
    this.winImages = {};
    this.winImages = getWinImage(this.slotsIds);
    let win: number[] = [];
    
    for (let winImage in this.winImages) {
      let timer = 500;

      if (+winImage >= 5) {
        this.useGirlsEffect(winImage);
        timer = 1000;
      }

      const formula = this.winImages[winImage] < 14 || !this.isYellowGirlActive
      ? +(this.winImages[winImage] * this.slotsCosts[+winImage]).toFixed(2)
      : +(this.winImages[winImage] * this.slotsCosts[+winImage] * 2).toFixed(2);

      win.push(formula);

      if (winImage === "3" && this.isRedGirlActive) {
        this.isRedGirlActive = false;
        this.slotsCosts[3] = 0.60;
      }

      setTimeout(
        action(() => {
          this.balance = +(this.balance + formula).toFixed(2);
        }), timer
      );
    }
    let totalWin = "";

    for (let i = 0; i < win.length; i++) {
      totalWin += ` +${win[i]} ¤ !`
    }

    setTimeout(
      action(() => {
        if (this.win) {
          this.win = `${totalWin}`;
          win = [];
          totalWin = "";
        }
      }), 1000
    )
    
  }

  // girls effects
  private useGirlsEffect = (girlsId: string) => {
    if (girlsId === "5") {
      this.isPinkGirlActive = true; // pink girl
      this.win = "FREE SPIN!";
    } else if (girlsId === "6") {
      this.isRedGirlActive = true; // red girl
      this.slotsCosts[3] = 1.20;
      this.win = "Mulled Wine's cost will be doubled!";
    } else if (girlsId === "7") {
      this.isYellowGirlActive = true; // yellow girl
      this.win = "Your win is doubled!";
    }
  }

  // Spin
  public spin = () => {
    this.isActive = true;
    this.win = "0";
  
    if (!this.isPinkGirlActive) {
      this.balance = Number((this.balance - this.stake).toFixed(2));
    } else {
      this.isPinkGirlActive = false;
    }

    this.slots = [];
    this.slotsIds = [];
    this.slotsAlpha = 0;

    setTimeout(
      action(() => {
        this.isActive = false;
      }), 1000
    );
  }
}