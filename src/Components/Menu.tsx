import React from "react";
import { Sprite } from "@pixi/react";
import { Texture } from "pixi.js";
import { exitImage, menuImage } from "../images";
import { OpenMenu } from "./OpenMenu";

interface MenuProps {
  width: number;
  height: number;
  changePage: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
  isHelpOpen: boolean;
  setIsHelpOpen: (value: boolean) => void;
}

export const Menu = ({ width, height, changePage, isMenuOpen, setIsMenuOpen, isHelpOpen, setIsHelpOpen }: MenuProps) => {
  const menu = menuImage;
  const exitMenu = exitImage;

  // open or close menu
  const openCloseMenu = React.useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  return (
    <>
      {!isMenuOpen
        ? <Sprite
            texture={Texture.from(menu)}
            x={width - 40}
            y={30}
            anchor={0.5}
            scale={1.2}
            interactive={true}
            cursor="pointer"
            pointerdown={openCloseMenu}
        />
        : <OpenMenu
            width={width}
            height={height} 
            exitMenu={exitMenu}
            openCloseMenu={openCloseMenu}
            changePage={changePage}
            isHelpOpen={isHelpOpen}
            openCloseHelp={setIsHelpOpen}
          />
      }
    </>
  );
}