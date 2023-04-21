import { Text } from "@pixi/react";
import { createTextStyle } from "../../utils/createStyles";
import { observer } from "mobx-react";
import { useStore } from "../../store/store";

export const Balance = observer(() => {
  const { AppStore, GameStore } = useStore();
  const text = `${GameStore.balance} ¤`;
  const textBalanceStyle = createTextStyle("heading");
  const textAmountStyle = createTextStyle("string");
  const positionX = AppStore.width > 768 ? 140 : 40;

  return (
    <>
      <Text text="BALANCE" style={textBalanceStyle} x={positionX} y={10} />
      <Text text={text} style={textAmountStyle} x={positionX} y={30} />
    </>
  );
})