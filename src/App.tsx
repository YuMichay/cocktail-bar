import React from "react";
import { Sprite, Stage } from "@pixi/react";
import { Texture } from "pixi.js";
import { HomePage } from "./Components/HomePage";
import { Game } from "./Components/Game/Game";
import { StoreContext, useStore } from "./store/store";
import { observer } from "mobx-react";
import { LoadingPage } from "./Components/LoadingPage";
import { action } from "mobx";

export const App: React.FC = observer(() => {
    const store = useStore();
    const { ImageStore, AppStore, handleResize } = store;
    
    // resize listener
    window.addEventListener("resize", handleResize);

    window.onload = action(() => AppStore.isLoading = false);

    if (AppStore.isLoading) {
      return <LoadingPage />;
    }

    return (
      <div className="app">
        <Stage width={AppStore.width} height={AppStore.height} options={{ autoStart: true }}>
          <Sprite width={AppStore.width} height={AppStore.height} texture={Texture.from(AppStore.width > 768 ? ImageStore.images.backgroundImage : ImageStore.images.backgroundVerticalImage)} />
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