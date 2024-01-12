import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  Navigate, Route, Routes, useNavigate,
} from 'react-router-dom';
import Detection from './Pages/Detection'
function App() {
  return (
    //   <h1 className="text-3xl font-bold underline italic">
    //   Hello world!
    // </h1>
    <Detection/>
  );
}

export default App;
