import React from "react";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";
import { useDarkTheme } from "../hooks/useDarkTheme";
const MainLayout = () => {
   const {darkTheme} = useDarkTheme()
   return (
      <>
         <Header />
         <main style={{transition : '0.7s' ,        background: darkTheme ? "#28282B" : "",}}className="main">
            <Outlet />
         </main>
      </>
   );
};

export default MainLayout;
