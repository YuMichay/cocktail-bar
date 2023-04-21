import { Container, Sprite, Text } from "@pixi/react";
import { createTextStyle } from "../../utils/createStyles";
import { pageText } from "../../utils/text";
import { Texture } from "pixi.js";
import { useStore } from "../../store/store";
import { observer } from "mobx-react";

export const Rules = observer(() => {
  const textStyle = createTextStyle("string");
  const { ImageStore, AppStore, RulesStore, handlePageChange } = useStore();

  return (
    <Container anchor={0.5} position={AppStore.width > 768 ? [AppStore.width / 4, AppStore.height / 4] : [AppStore.width / 3, AppStore.height / 3]}>
      <Text text={pageText[RulesStore.page]} style={textStyle} anchor={0.5} width={AppStore.width / 2.3} />
      <Sprite
        texture={Texture.from(ImageStore.images.arrowLeft)}
        x={AppStore.width > 768 ? -AppStore.width / 4 + 15 : -AppStore.width / 3 + 15}
        anchor={0.5}
        interactive={RulesStore.page > 0}
        alpha={RulesStore.page <= 0 ? 0.5 : 1}
        cursor="pointer"
        pointerdown={() => handlePageChange(RulesStore.page - 1)}
      />
      <Sprite
        texture={Texture.from(ImageStore.images.arrowRight)}
        x={AppStore.width > 768 ? AppStore.width / 4 - 15 : AppStore.width / 3 - 15}
        anchor={0.5}
        interactive={RulesStore.page < 2}
        alpha={RulesStore.page >= 2 ? 0.5 : 1}
        cursor="pointer"
        pointerdown={() => handlePageChange(RulesStore.page + 1)}
      />
    </Container>
  );
})