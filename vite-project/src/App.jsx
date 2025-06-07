import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css"; // Import the CSS file
import Contact from "./Pages/Contact";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Admin1 from "./Pages/Admin1";

import PDFViewer from "./Pages/PDFViewer";
import Team from "./Pages/Team";
import Team1 from "./Pages/Team1";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

// Main App Component
const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin1 />
                </ProtectedRoute>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<Team />} />
            <Route path="/team1" element={<Team1 />} />
            <Route path="/PDFViewer" element={<PDFViewer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
