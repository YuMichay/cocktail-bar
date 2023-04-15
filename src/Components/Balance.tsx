import { Text } from "@pixi/react";
import { createTextStyle } from "../utils/createStyles";

interface BalanceProps {
  balance: number;
}

export const Balance = ({balance}: BalanceProps) => {
  const text = `${balance} ¤`;
  const textBalanceStyle = createTextStyle("heading");
  const textAmountStyle = createTextStyle("string");

  return (
    <>
      <Text text="BALANCE" style={textBalanceStyle} x={40} y={10} />
      <Text text={text} style={textAmountStyle} x={40} y={30} />
    </>
  );
}