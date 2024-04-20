// src/App.js
import React from "react";
import TopImage from './topimage';
import './App.css'; // Import CSS file for styling
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstPage from "./recording";
import SecondPage from "./results";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/second" element={<SecondPage />} />
        </Routes>
      </Router>
      <header>
        <img src="top-image.png" alt="Top Image" className="top-image" />
      </header>
      {/* Other components */}
    </div>
  );
}


export default App;
