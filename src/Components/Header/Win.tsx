import { Container, Text } from "@pixi/react";
import { createTextStyle } from "../../utils/createStyles";
import { observer } from "mobx-react";
import { useStore } from "../../store/store";

export const Win = observer(() => {
  const { AppStore, GameStore } = useStore();
  const text = GameStore.win !== "0" ? GameStore.win : "";
  const textWinStyle = createTextStyle("winString");

  return (
    <Container position={[AppStore.width / 2, 30]}>
      <Text text={text} style={textWinStyle} anchor={0.5} />
    </Container>
  );
})