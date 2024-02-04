import React from 'react'
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MainLayout from "./layout/MainLayout";
function App() {
   return (
      <Routes>
         <Route path="/" element = {<MainLayout/>}>
            <Route index element={<MainPage />} />
         </Route>
      </Routes>
   );
}

export default App;
