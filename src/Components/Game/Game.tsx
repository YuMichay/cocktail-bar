import { Container, Graphics } from "@pixi/react";
import { Balance } from "../Header/Balance";
import { Volume } from "../Header/Volume";
import { FullScreen } from "../Header/FullScreen";
import { Menu } from "../Header/Menu/Menu";
import { Help } from "../Help/Help";
import { Field } from "./Field";
import { StoreContext, store, useStore } from "../../store/store";
import { observer } from "mobx-react";

export const Game = observer(() => {
  const { AppStore, GameStore } = useStore();

  return (
      <Container anchor={0.5}>
        <StoreContext.Provider value={store}>
          <Container>
            <Graphics
              draw={(g) => {
                g.beginFill(0x000000, 0.7);
                g.drawRect(0, 0, AppStore.width, 60);
                g.endFill();
              }}
            />
            <Balance />
            <Volume />
            <FullScreen />
            <Menu />
            { GameStore.isHelpOpen && <Help /> }
          </Container>
          <Field />
        </StoreContext.Provider>
      </Container>
  );
});