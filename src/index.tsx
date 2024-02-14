// @ts-nocheck

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider as ThemeProviderContext } from "./contexts/themeContext.tsx";
import { store } from "./store/index.ts";
import { GoogleOAuthProvider } from "@react-oauth/google";
const root = ReactDOM.createRoot(
   document.getElementById("root") as HTMLElement
);

root.render(
   <Provider store={store}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
         <ThemeProviderContext>
            <BrowserRouter>
               <App />
            </BrowserRouter>
         </ThemeProviderContext>
      </GoogleOAuthProvider>
   </Provider>
);
