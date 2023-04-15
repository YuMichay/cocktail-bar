import React from "react";
import ReactDOM from 'react-dom/client'
import  App  from "./App";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
    <audio src="./assets/Game-Over-final.mp3" loop autoPlay />
  </React.StrictMode>
);