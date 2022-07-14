import React from "react";
import SearchPage from "./SearchPage";
import ResultPage from "./ResultPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/result/:term" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
