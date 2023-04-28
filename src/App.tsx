import React from "react";
import { Sprite, Stage } from "@pixi/react";
import { Texture } from "pixi.js";
import { HomePage } from "./Components/HomePage";
import { Game } from "./Components/Game/Game";
import { StoreContext, useStore } from "./stores/store";
import { observer } from "mobx-react";
import { LoadingPage } from "./Components/LoadingPage";
import { action } from "mobx";

export const App: React.FC = observer(() => {
    const store = useStore();
    const { ImageStore, AppStore, GameStore } = store;

    if (GameStore.isVolumeOn) {
      document.querySelector("audio")?.play();
    }
    
    // resize listener
    window.addEventListener("resize", AppStore.handleResize);

    setTimeout(action(() => {
      AppStore.isLoading = false;
    }), 1000)

    if (AppStore.isLoading) {
      return <StoreContext.Provider value={store}><LoadingPage /></StoreContext.Provider>;
    }

    return (
      <div className="app">
        <Stage width={AppStore.width} height={AppStore.height} options={{ autoStart: true }}>
          <Sprite width={AppStore.width} height={AppStore.height} texture={Texture.from(AppStore.isMediumScreen ? ImageStore.images.backgroundImage : ImageStore.images.backgroundVerticalImage)} />
          <StoreContext.Provider value={store}>
            { !AppStore.isPlayClicked
              ? <HomePage />
              : <Game />
            }
          </StoreContext.Provider>
        </Stage>
      </div>
    )
});