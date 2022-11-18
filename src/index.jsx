import React from 'react'
import ReactDOM from 'react-dom/client'
import "./style/main.scss";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import HousePage from "./pages/HousePage";
import ErrorPage from "./pages/ErrorPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="house/:id" element={<HousePage />} />
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  </BrowserRouter>
);