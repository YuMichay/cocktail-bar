import React from "react";
import { Sprite, Stage } from "@pixi/react";
import { Texture } from "pixi.js";
import { WelcomePage } from "./Components/WelcomePage";
import { Game } from "./Components/Game";
import { backgroundImage } from "./images";

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const App = () => {
    const [width, setWidth] = React.useState(windowWidth);
    const [height, setHeight] = React.useState(windowHeight);
    const [isClicked, setClick] = React.useState(false);
    const background = backgroundImage;
  
    React.useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleClick = () => {
      setClick(true);
    }

    return (
        <Stage width={width} height={height} options={{ autoStart: true }}>
          <Sprite width={width} height={height} texture={Texture.from(background)} />
          { !isClicked
            ? <WelcomePage width={width} height={height} onClick={handleClick} />
            : <Game width={width} height={height} onClick={handleClick} />
          }
          
        </Stage>
    )
}
export default App;