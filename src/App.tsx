import React from "react";
import { Sprite, Stage } from "@pixi/react";
import { Texture } from "pixi.js";
import { WelcomePage } from "./Components/HomePage";
import { Game } from "./Components/Game";
import { backgroundImage } from "./images";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const App = () => {
    const [width, setWidth] = React.useState(windowWidth);
    const [height, setHeight] = React.useState(windowHeight);
    const [isPlayClicked, setisPlayClicked] = React.useState(false);
    const [isFullscreenOn, setIsFullscreenOn] = React.useState(false);
    const background = backgroundImage;
    
    // resize listener
    React.useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    // move to game or to home page
    const changePage = () => {
      setisPlayClicked(!isPlayClicked);
    }

    return (
        <Stage width={width} height={height} options={{ autoStart: true }}>
          <Sprite width={width} height={height} texture={Texture.from(background)} />
          { !isPlayClicked
            ? <WelcomePage width={width} height={height} onClick={changePage} />
            : <Game width={width} height={height} onClick={changePage} isFullscreenOn={isFullscreenOn} setIsFullscreenOn={setIsFullscreenOn} />
          }
        </Stage>
    )
}
export default App;