import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MainLayout from "./layout/MainLayout";
import SearchPage from "./pages/SearchPage";
import SinglePage from "./pages/SinglePage";
function App() {
   return (
      <Routes>
         <Route path="/" element={<MainLayout />}>
            <Route index element={<MainPage />} />
            <Route path="search/:query" element={<SearchPage />} />
            <Route path="singlePage/:id" element={<SinglePage />} />
         </Route>
      </Routes>
   );
}

export default App;
