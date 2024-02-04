// @ts-nocheck

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider as ThemeProviderContext } from "./contexts/themeContext.tsx";
import { store } from "./store/index.ts";

const root = ReactDOM.createRoot(
   document.getElementById("root") as HTMLElement
);

root.render(
   <Provider store={store}>
    
         <ThemeProviderContext>
            <BrowserRouter>
               <App />
            </BrowserRouter>
         </ThemeProviderContext>
    
   </Provider>
);
