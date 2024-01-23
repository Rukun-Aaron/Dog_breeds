import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Navbar from './components/NavBar';
import ImageUploadNew from './pages/ImageUploadNew';
import Homepage from './components/Homepage';

function App() {
  return (
    <Router basename="/Dog_breeds/frontend2">
      <div className="w-full h-screen drawer drawer-end">
        <Navbar />
        <div className="h-full w-full dark:bg-neutral-900 scrollbar overflow-y-auto">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/detection" element={<ImageUploadNew />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
