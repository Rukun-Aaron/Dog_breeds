import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Navbar from './components/NavBar';
import ImageUploadNew from './pages/ImageUploadNew';
import Homepage from './components/Homepage';
import Compare from './pages/Compare';
import './styles/scrollbar.css';
import { createTheme,ThemeProvider} from '@mui/material/styles';function App() {
  const theme=createTheme({
    typography: {
      fontFamily: [
        'Outfit',
        'sans-serif'
      ].join(','),
    }
  })
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div className="w-full h-screen drawer drawer-end">
        {/* <Navbar /> */}
        <div className="h-full w-full dark:bg-neutral-900 scrollbar overflow-y-auto">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/detection" element={<ImageUploadNew />} />
            <Route path="/compare" element={<Compare />} />
          </Routes>
        </div>
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
