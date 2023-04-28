import { Container, Text } from "@pixi/react";
import { createTextStyle } from "../../utils/createStyles";
import { observer } from "mobx-react";
import { useStore } from "../../stores/store";

export const Balance = observer(() => {
  const { AppStore, GameStore } = useStore();
  const text = `${GameStore.balance} ¤`;
  const textBalanceStyle = createTextStyle("heading");
  const textAmountStyle = createTextStyle("string");
  const positionX = AppStore.isLargeScreen ? 140 : 40;

  return (
    <Container position={[positionX, 10]}>
      <Text text="BALANCE" style={textBalanceStyle} />
      <Text text={text} style={textAmountStyle} y={20} />
    </Container>
  );
})