import React from "react";
import ReactDOM from 'react-dom/client'
import { App } from "./App";
import { StoreContext, store } from "./stores/store";
import "./style.css";

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={store}>
      <App />
      <audio src="./assets/Game-Over-final.mp3" loop autoPlay={true}/>
    </StoreContext.Provider>
  </React.StrictMode>
);