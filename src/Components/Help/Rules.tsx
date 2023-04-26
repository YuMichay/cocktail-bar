import { Container, Sprite, Text } from "@pixi/react";
import { createTextStyle } from "../../utils/createStyles";
import { pageText } from "../../utils/text";
import { Texture } from "pixi.js";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react";

export const Rules = observer(() => {
  const textStyle = createTextStyle("string");
  const { ImageStore, AppStore, GameStore } = useStore();

  return (
    <Container anchor={0.5} position={AppStore.width > 768 ? [AppStore.width / 4, AppStore.height / 4] : [AppStore.width / 3, AppStore.height / 3]}>
      <Text text={pageText[GameStore.page]} style={textStyle} anchor={0.5} width={AppStore.width / 2.3} />
      <Sprite
        texture={Texture.from(ImageStore.images.arrowLeft)}
        x={AppStore.width > 768 ? -AppStore.width / 4 + 15 : -AppStore.width / 3 + 15}
        anchor={0.5}
        interactive={GameStore.page > 0}
        alpha={GameStore.page <= 0 ? 0.5 : 1}
        cursor="pointer"
        pointerdown={() => GameStore.handlePageChange(GameStore.page - 1)}
      />
      <Sprite
        texture={Texture.from(ImageStore.images.arrowRight)}
        x={AppStore.width > 768 ? AppStore.width / 4 - 15 : AppStore.width / 3 - 15}
        anchor={0.5}
        interactive={GameStore.page < 2}
        alpha={GameStore.page >= 2 ? 0.5 : 1}
        cursor="pointer"
        pointerdown={() => GameStore.handlePageChange(GameStore.page + 1)}
      />
    </Container>
  );
})