import React from "react";
import SearchPage from "./components/SearchPage";
import ResultPage from "./components/ResultPage";
import PageNotFound from "./components/PageNotFound";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/result" element={<Navigate to="/" replace />} />
        <Route path="/result/:slug" element={<ResultPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
