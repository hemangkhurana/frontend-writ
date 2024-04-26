import React from "react";
import { Route, Routes } from "react-router-dom";
import WP from "../pages/institutionalMemory/WP.js";
import AddWP from "../pages/institutionalMemory/AddWP";
import Filter from "../pages/institutionalMemory/Filter";
const WritRoutes = () => {
    return (
            <Routes>
                <Route path="/" element={<WP />} />
                <Route path="/add-wp" element={<AddWP />} />                
                <Route path="/filter" element={<Filter/>}/>
            </Routes>
    );
}

export default WritRoutes;