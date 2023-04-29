import { Container, Text } from "@pixi/react";
import { createTextStyle } from "../../utils/createStyles";
import { observer } from "mobx-react";
import { useStore } from "../../stores/store";

export const Win = observer(() => {
  const { AppStore, GameStore } = useStore();
  const text = GameStore.win !== "0" ? GameStore.win : "";
  const textWinStyle = AppStore.isSmallScreen ? createTextStyle("winString") : createTextStyle("winString", 16);

  return (
    <Container position={[AppStore.width / 2, AppStore.isSmallScreen ? 30 : 70]}>
      <Text text={text} style={textWinStyle} anchor={0.5} />
    </Container>
  );
})