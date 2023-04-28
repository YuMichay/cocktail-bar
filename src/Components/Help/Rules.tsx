import { Container, Sprite, Text } from "@pixi/react";
import { createTextStyle } from "../../utils/createStyles";
import { pageText, smallPageText } from "../../utils/text";
import { Texture } from "pixi.js";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react";

export const Rules = observer(() => {
  const { ImageStore, AppStore, GameStore } = useStore();
  const textStyle = AppStore.isSmallScreen ? createTextStyle("string") : createTextStyle("string", "normal", "14");
  const text = AppStore.isSmallScreen ? pageText : smallPageText;
  const pages = AppStore.isSmallScreen ? 2 : 4;
  const width = AppStore.isMediumScreen ? AppStore.width / 2.4 : AppStore.isSmallScreen ? AppStore.width / 2 : AppStore.width - 120;

  return (
    <Container anchor={0.5} position={[ AppStore.isMediumScreen ? AppStore.width / 4 : AppStore.isSmallScreen ? AppStore.width / 3 : AppStore.width / 2.2, AppStore.height / 4]}>
      <Text text={text[GameStore.page]} style={textStyle} anchor={0.5} width={width} />
      <Sprite
        texture={Texture.from(ImageStore.images.arrowLeft)}
        x={AppStore.isMediumScreen ? -AppStore.width / 4 + 15 : AppStore.isSmallScreen ? -AppStore.width / 3 + 15 : -AppStore.width / 2 + 35}
        anchor={0.5}
        interactive={GameStore.page > 0}
        alpha={GameStore.page <= 0 ? 0.5 : 1}
        cursor="pointer"
        pointerdown={() => GameStore.handlePageChange(GameStore.page - 1)}
      />
      <Sprite
        texture={Texture.from(ImageStore.images.arrowRight)}
        x={AppStore.isMediumScreen ? AppStore.width / 4 - 15 : AppStore.isSmallScreen ? AppStore.width / 3 - 15 : AppStore.width / 2 - 45}
        anchor={0.5}
        interactive={GameStore.page < pages}
        alpha={GameStore.page >= pages ? 0.5 : 1}
        cursor="pointer"
        pointerdown={() => GameStore.handlePageChange(GameStore.page + 1)}
      />
    </Container>
  );
})