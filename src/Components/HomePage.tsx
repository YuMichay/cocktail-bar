import React from "react";
import { Container, Sprite, Text } from "@pixi/react";
import { Texture, Ticker } from "pixi.js";
import { createGlowFilter, createTextStyle } from "../utils/createStyles";
import { observer } from "mobx-react";
import { useStore } from "../stores/store";

export const HomePage = observer(() => {
  const buttonStyle = createTextStyle("button");
  const { ImageStore, AppStore, HomePageStore, changePage } = useStore();

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
        scale={AppStore.width < 425 || AppStore.height < 640 ? 0.3 : 0.4}
        filters={HomePageStore.glowFilter ? [HomePageStore.glowFilter] : []}
      />
      <Container
        x={AppStore.width / 2}
        y={AppStore.height < 640 ? AppStore.height / 2 + 150 : AppStore.height / 2 + 230}
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
          width={AppStore.width < 768 ? 100 : 200}
          height={80}
          anchor={0.5}
          tint={0x12121C}
        />
        <Text text="Play" anchor={0.5} style={buttonStyle} />
      </Container>
    </Container>
  );
});
