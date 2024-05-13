import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import ShowSummary from './Components/ShowSummary';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <div className="header">
         Show Explorer
        </div>
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/show/:id" element={<ShowSummary/>} />
        </Routes>
        <div className="footer">
           &copy; 2024 Show Explorer. All rights reserved.
        </div>
      </div>
    </Router>
  );
}

export default App;
