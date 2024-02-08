import React from 'react'
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MainLayout from "./layout/MainLayout";
import SearchPage from './pages/SearchPage';
function App() {
   return (
      <Routes>
         <Route path="/" element = {<MainLayout/>}>
            <Route index element={<MainPage />} />
            <Route path='search/:query' element = {<SearchPage/>}    />
         </Route>
      </Routes>
   );
}

export default App;
