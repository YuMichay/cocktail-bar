import React from "react";
import { Sprite, Stage } from "@pixi/react";
import { Texture } from "pixi.js";
import { HomePage } from "./Components/HomePage";
import { Game } from "./Components/Game/Game";
import { StoreContext, useStore } from "./store/store";
import { observer } from "mobx-react";

export const App: React.FC = observer(() => {
    const store = useStore();
    const { ImageStore, AppStore, calculateWidth, calculateHeight } = store;

    // resize listener
    React.useEffect(() => {
      const handleResize = () => {
        calculateWidth();
        calculateHeight();
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

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