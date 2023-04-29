import React from "react";
import { Container, Sprite, Text } from "@pixi/react";
import { Texture, Ticker } from "pixi.js";
import { createGlowFilter, createTextStyle } from "../utils/createStyles";
import { observer } from "mobx-react";
import { useStore } from "../stores/store";

export const HomePage = observer(() => {
  const { ImageStore, AppStore, HomePageStore, changePage } = useStore();
  const buttonStyle = AppStore.isSmallScreen ? createTextStyle("button") : createTextStyle("button", 30);

  // creation filter for image
  React.useEffect(() => {
    const newGlowFilter = createGlowFilter(0);
    HomePageStore.setGlowFilter(newGlowFilter);
  }, []);

  // shimmering effect for image
  React.useEffect(() => {
    const ticker = new Ticker();
    ticker.add(() => {
      const now = Date.now() * 0.001;
      HomePageStore.changeStrength(0.5 + Math.sin(now * 2) * 0.5);
    });
    ticker.start();
    return () => {
      ticker.stop();
      ticker.destroy();
    };
  }, []);

  React.useEffect(() => {
    if (HomePageStore.glowFilter) {
      HomePageStore.glowFilter!.outerStrength = HomePageStore.strength * 5;
      HomePageStore.glowFilter!.innerStrength = HomePageStore.strength * 5;
    }
  }, [HomePageStore.strength, HomePageStore.glowFilter]);

  return (
    <Container anchor={0.5} >
      <Sprite
        texture={Texture.from(ImageStore.images.logoImage)}
        x={AppStore.width / 2}
        y={AppStore.height  / 2 - 50}
        anchor={0.5}
        scale={AppStore.isSmallScreen ? 0.4 : 0.3}
        filters={HomePageStore.glowFilter ? [HomePageStore.glowFilter] : []}
      />
      <Container
        x={AppStore.width / 2}
        y={AppStore.height / 2 + 230}
        interactive={true}
        pointerdown={changePage}
        cursor="pointer"
        mouseover={HomePageStore.handleMouseOver}
        mouseout={HomePageStore.handleMouseOut}
        filters={HomePageStore.isHovered && HomePageStore.buttonGlowFilter ? [HomePageStore.buttonGlowFilter] : []}
        alpha={0.8}
      >
        <Sprite
          texture={Texture.WHITE}
          width={AppStore.isSmallScreen ? 200 : 150}
          height={80}
          anchor={0.5}
          tint={0x12121C}
        />
        <Text text="Play" anchor={0.5} style={buttonStyle} />
      </Container>
    </Container>
  );
});
