import { Container, Graphics  } from "@pixi/react";
import { Balance } from "../Header/Balance";
import { Volume } from "../Header/Volume";
import { FullScreen } from "../Header/FullScreen";
import { Menu } from "../Header/Menu/Menu";
import { Help } from "../Help/Help";
import { Field } from "./Field";
import { StoreContext, store, useStore } from "../../stores/store";
import { observer } from "mobx-react";
import { OpenMenu } from "../Header/Menu/OpenMenu";
import { Win } from "../Header/Win";

export const Game = observer(() => {
  const { AppStore, GameStore } = useStore();

  return (
    <StoreContext.Provider value={store}>
      <Container>
        <Field />
        <Graphics
          draw={(g) => {
            g.clear();
            g.beginFill(0x000000, 0.7);
            g.drawRect(0, 0, AppStore.width, 60);
            g.endFill();
          }}
        />
        <Container>
          <Balance />
          <Win />
          {!GameStore.isMenuOpen
            ? <Container position={[AppStore.isLargeScreen ? AppStore.width - 260 : AppStore.width - 160, 30]}>
                <Volume />
                <FullScreen />
                <Menu />
              </Container>
            : <OpenMenu />
          }
          { GameStore.isHelpOpen && <Help /> }
        </Container>
      </Container>
    </StoreContext.Provider>
  );
});